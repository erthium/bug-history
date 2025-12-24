# Bug History Frontend

Angular application for the Bug History blog.

## Requirements

- Node.js 18+ (v22.21.1 used)
- npm 10+ (v10.9.4 used)

## Setup

```bash
npm install
```

## Development

```bash
npm run start
```

Runs at `http://localhost:4200`.

## Build

```bash
npm run build
```

Output is generated in `dist/bug-history/browser`.

## Project Structure

```
src/
├── app/
│   ├── components/          # Shared components
│   │   ├── header/
│   │   └── theme-selector/
│   ├── pages/               # Route components
│   │   ├── blog/            # Individual blog post
│   │   └── home/            # Blog listing
│   ├── services/
│   │   ├── blog.service.ts  # Blog fetching and view counts
│   │   └── theme.service.ts # Theme management
│   ├── app.routes.ts
│   └── app.ts
├── index.html
├── main.ts
└── styles.css
public/
└── blogs/                   # Markdown blog posts
```

## Adding Blog Posts

1. Create a markdown file in `public/blogs/` with frontmatter:
   ```markdown
   ---
   title: "Post Title"
   date: "2024-01-15"
   summary: "Brief description"
   tags: [tag1, tag2]
   ---

   Post content here...
   ```

2. Add the slug to `blogSlugs` array in `src/app/services/blog.service.ts`.

## View Count Integration

The frontend calls `/api/views/{slug}` endpoints to track and display view counts. These endpoints are handled by Vercel Serverless Functions. When the API is unavailable, view counts are hidden from the UI.
