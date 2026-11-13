# ChangeNest

ChangeNest is a volunteer-events website built with Next.js App Router, React, and TypeScript.

## Development

Install dependencies with npm, then start the development server:

```bash
npm install
npm run dev
```

Other project commands:

```bash
npm run lint
npm run build
npm run start
```

## Event backend configuration

The Express event API lives in the sibling `changenestsever` project and can be
started with `node index.js`. The Next.js app uses `EVENT_API_URL` as the
backend origin. It defaults to `http://localhost:8000` in development and must
be set when deploying.

The backend uses `JWKS_URL` as the origin of the Next.js app's Better Auth
JWKS endpoint. It defaults to `http://localhost:3000` in development and must
be set to an origin reachable by the backend when deploying.

## Project structure

```text
src/
  app/          Routes, layouts, global styles, API handlers, and app assets
  components/   Shared UI grouped by feature
  types/        Shared TypeScript definitions
```

The homepage is composed in `src/app/page.tsx`; reusable homepage sections and data live in `src/components/home/`. The `@/*` import alias points to `src/*`.
