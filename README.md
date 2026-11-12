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

## Project structure

```text
src/
  app/          Routes, layouts, global styles, API handlers, and app assets
  components/   Shared UI grouped by feature
  types/        Shared TypeScript definitions
```

The homepage is composed in `src/app/page.tsx`; reusable homepage sections and data live in `src/components/home/`. The `@/*` import alias points to `src/*`.
