# Bug History

A blog documenting bugs, edge cases, and difficult situations encountered throughout software engineering.

## Project Structure

```
bug-history/
├── api/                 # Vercel Serverless Functions
│   └── views/           # View count tracking endpoints
├── frontend/            # Angular application
├── package.json         # Root dependencies (API)
├── tsconfig.json        # TypeScript config (API)
└── vercel.json          # Vercel deployment configuration
```

## Tech Stack

- **Frontend**: Angular 21, TailwindCSS
- **API**: Vercel Edge Functions (TypeScript)
- **Database**: Upstash Redis
- **Hosting**: Vercel

## Local Development

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend runs at `http://localhost:4200`. Note that view count features require the API to be deployed.

### API

API functions are designed to run on Vercel. For local testing, use Vercel CLI:

```bash
npm install
vercel dev
```

This requires environment variables. Pull them from Vercel:

```bash
vercel env pull .env.local
```

## Deployment

### Prerequisites

1. Vercel CLI installed: `npm i -g vercel`
2. Vercel account linked: `vercel login`

### Initial Setup

1. Link the project:
   ```bash
   vercel link
   ```

2. Create Upstash Redis database:
   - Go to `Vercel Dashboard` > `Your Project` > `Storage`
   - Select `Upstash` from the Marketplace
   - Create a `Upstash for Redis` database
   - Connect it to your project

   This automatically adds `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` environment variables.

3. Deploy:
   ```bash
   vercel --prod
   ```

### Automatic Deployments

Connect your GitHub repository for automatic deployments:

```bash
vercel git connect
```

## Environment Variables

| Variable | Description | Source |
|----------|-------------|--------|
| `UPSTASH_REDIS_REST_URL` | Redis REST API endpoint | Upstash integration |
| `UPSTASH_REDIS_REST_TOKEN` | Redis authentication token | Upstash integration |
| `IP_HASH_SALT` | Salt for IP hashing (optional) | Manual |

The Upstash variables are automatically injected by Vercel when Upstash is connected to the project.

To set the optional salt, go to Vercel Dashboard > Project > Settings > Environment Variables and add `IP_HASH_SALT` with a random string value.

