<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Single-package Next.js 16 App Router site; source lives under `src/` (the README's `app/page.tsx` path is stale — home is `src/app/page.tsx`). No tests, CI, or monorepo. Auth is Better Auth + MongoDB; every other page is static UI.

## Commands

- Install with npm (`package-lock.json` is the only lockfile); ignore the README's yarn/pnpm/bun alternatives.
- `npm run dev` — Turbopack dev server on localhost:3000.
- `npm run lint` (runs `eslint` over the repo), or `npx eslint <path>` for one file.
- `npx tsc --noEmit` — typecheck; `npm run build` also typechecks and is the full verification.
- There is no `npm test`; no test runner is configured.

## Auth / environment

- `.env` (gitignored, no example file) needs `MONGO_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, and `GOOGLE_SECRET`. Note `GOOGLE_SECRET` — not the usual `GOOGLE_CLIENT_SECRET`.
- The Mongo database name is hardcoded as `change-nest` in `src/app/lib/auth.ts`; the database named in `MONGO_URI` is ignored.
- Server config: `src/app/lib/auth.ts`. Browser client: `src/app/lib/auth-client.ts` (re-exports `signIn`, `signUp`, `signOut`, `useSession`). Catch-all handler: `src/app/api/auth/[...all]/route.ts` (via `toNextJsHandler`). This project uses `src/app/lib/`, not `src/lib/`.
- Import `auth` only in server code and `authClient` only in client components (`"use client"`).
- Sign-up/sign-in forms in `src/components/auth/` call `authClient` directly; there are no auth server actions.

## Styling / UI

- Tailwind CSS v4 runs through the `@tailwindcss/turbopack` loader for all `*.css` in `next.config.ts`, not PostCSS. There is no `tailwind.config.*` or `postcss.config.*`; don't add one for ordinary utility styles.
- `src/app/globals.css` imports both `tailwindcss` and `@heroui/styles`; keep both. HeroUI is v3 (`@heroui/react` 3.x) but no components use it yet — don't add a provider or apply v2/NextUI setup from memory.
- Theme tokens are defined in `globals.css` via `@theme`: `brand` (`#16A34A`), `ink` (`#0F172A`), `canvas` (`#F8FAFC`). Use them instead of hard-coded colors.
- Component comments are transliterated Bengali ("Banglish"), e.g. `// Error hole red tone hobe.` Match that style when adding comments.

## Structure

- Root chrome: `src/app/layout.tsx` (navbar, footer, `ToastContainer`).
- Live navbar: `src/components/nave/Navebar.tsx` (imported by the layout; note the `nave`/`Navebar` spellings).
- Feature components live under `src/components/<feature>/` (e.g. `auth/`, `contact/`); `Banner.tsx` and `Footer.tsx` sit at the `src/components/` top level.
- `ContactForm` is client-side only: it builds a `mailto:` link, with no API route or email service behind it.
- `@/*` maps to `src/*`; local images live in `src/app/assets/` and are imported statically.
- Next 16 generates route prop types (`LayoutProps<"/">`, etc.); use those instead of hand-writing route props.
- React Compiler is enabled; avoid adding memoization solely for render performance.
