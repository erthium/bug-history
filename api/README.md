# Bug History API

Vercel Edge Functions for blog view count tracking.

## Endpoints

### GET /api/views/{slug}

Returns the view count for a specific blog post.

**Response:**
```json
{
  "count": 42
}
```

### POST /api/views/{slug}

Tracks a view for a blog post. Increments count only for unique IP addresses.

**Response:**
```json
{
  "count": 43,
  "incremented": true
}
```

If the IP has already viewed the post:
```json
{
  "count": 43,
  "incremented": false
}
```

### GET /api/views/all

Returns view counts for all blog posts.

**Response:**
```json
{
  "views": {
    "my-first-post": 42,
    "another-post": 17
  }
}
```

## Data Storage

Uses Upstash Redis with the following key structure:

| Key Pattern | Value |
|-------------|-------|
| `views:{slug}` | `{ count: number, viewers: string[] }` |

The `viewers` array stores SHA-256 hashed IP addresses. Raw IP addresses are never stored.

## Environment Variables

Required (automatically provided by Upstash integration):

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Optional:

- `IP_HASH_SALT` - Salt for IP address hashing. If not provided, defaults to `"null"`. Set a random string for additional security against rainbow table attacks.

## How It Works

1. Vercel detects TypeScript files in `/api` and deploys them as Edge Functions.
2. File names determine routes:
   - `[slug].ts` handles dynamic routes (`/api/views/my-post`)
   - `all.ts` handles the static route (`/api/views/all`)
3. Functions use `@upstash/redis` to connect to the database.
4. IP addresses are extracted from `x-forwarded-for` or `x-real-ip` headers.

## Unique View Tracking

Views are tracked per IP address per post:

1. User visits `/blog/my-post`
2. Frontend calls `POST /api/views/my-post`
3. Function extracts client IP from headers
4. IP is hashed using SHA-256
5. If hash not in `viewers` array, increment count and store hash
6. If hash already exists, return current count without incrementing

This prevents inflated counts from page refreshes or repeated visits.

## Privacy

IP addresses are salted and hashed with SHA-256 before storage. The hash is one-way and irreversible. Even if the database is compromised, the original IP addresses cannot be recovered. The salt (configured via `IP_HASH_SALT`) prevents rainbow table attacks.

