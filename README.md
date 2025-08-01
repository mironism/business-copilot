# BusinessCopilot

AI-powered business documentation platform that turns raw ideas into complete, actionable business documentation.

## Architecture

This is a monorepo containing:

- `landing/` - Marketing landing page (Next.js)
- `app/` - Authenticated dashboard (Next.js) 
- `docs/` - Product requirements and technical specifications

## Deployment

- **Landing**: `business.com` (Vercel)
- **App**: `app.business.com` (Vercel)
- **Database**: Supabase
- **AI**: OpenAI + Perplexity APIs

## Development

Each app has its own `package.json` and can be developed independently:

```bash
# Landing page
cd landing
npm install
npm run dev

# Dashboard (coming soon)
cd app
npm install  
npm run dev
```

## Documentation

See `docs/` folder for:
- Product Requirements Document (PRD)
- Technical specifications (Supabase, Next.js API)
- Implementation checklist

## Status

🚧 **Phase 0**: Repository setup and deployment pipeline