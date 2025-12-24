import { Redis } from '@upstash/redis';

export const config = {
  runtime: 'edge',
};

// Initialize Redis client - reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN automatically
const redis = Redis.fromEnv();

interface ViewData {
  count: number;
  viewers: string[];
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get all view keys
    const keys = await redis.keys('views:*');

    if (keys.length === 0) {
      return new Response(JSON.stringify({ views: {} }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    // Fetch all view data
    const views: Record<string, number> = {};

    for (const key of keys) {
      const data = await redis.get<ViewData>(key);
      const slug = key.replace('views:', '');
      views[slug] = data?.count || 0;
    }

    return new Response(JSON.stringify({ views }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching all views:', error);
    return new Response(JSON.stringify({ views: {} }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
