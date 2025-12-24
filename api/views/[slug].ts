import { Redis } from '@upstash/redis';

export const config = {
  runtime: 'edge',
};

// Initialize Redis client - reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN automatically
const redis = Redis.fromEnv();

interface ViewData {
  count: number;
  viewers: string[]; // Stores hashed IPs, not raw IPs
}

function getClientIP(request: Request): string {
  // Vercel provides the real IP in x-forwarded-for header
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one (client IP)
    return forwardedFor.split(',')[0].trim();
  }

  // Fallback to x-real-ip
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Last resort fallback
  return 'unknown';
}

async function hashIP(ip: string): Promise<string> {
  const salt = process.env.IP_HASH_SALT ?? 'null';
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + ip);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const slug = url.pathname.split('/').pop();

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const viewsKey = `views:${slug}`;

  // Handle GET request - return current view count
  if (request.method === 'GET') {
    try {
      const data = await redis.get<ViewData>(viewsKey);
      return new Response(JSON.stringify({ count: data?.count || 0 }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    } catch (error) {
      console.error('Error fetching views:', error);
      return new Response(JSON.stringify({ count: 0 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Handle POST request - increment view count if unique IP
  if (request.method === 'POST') {
    try {
      const clientIP = getClientIP(request);
      const hashedIP = await hashIP(clientIP);

      // Get current data
      let data = await redis.get<ViewData>(viewsKey);

      if (!data) {
        data = { count: 0, viewers: [] };
      }

      // Check if this hashed IP has already viewed this post
      if (!data.viewers.includes(hashedIP)) {
        data.count += 1;
        data.viewers.push(hashedIP);

        // Save updated data
        await redis.set(viewsKey, data);

        return new Response(
          JSON.stringify({ count: data.count, incremented: true }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // IP already viewed, return current count without incrementing
      return new Response(
        JSON.stringify({ count: data.count, incremented: false }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Error updating views:', error);
      return new Response(JSON.stringify({ error: 'Failed to update views' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Handle unsupported methods
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}
