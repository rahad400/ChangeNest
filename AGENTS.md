<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Single-package Next.js 16 App Router site (`next` 16.4.5, React 19, React Compiler); source lives under `src/`. No tests, CI, or monorepo. The README is mostly stale: home is `src/app/page.tsx`, not `app/page.tsx`, and npm is the only package manager with a lockfile. Auth is Better Auth + MongoDB; most pages are static shells with client-side forms.

## Commands

- Install with npm (`package-lock.json` is the only lockfile); ignore the README's yarn/pnpm/bun alternatives.
- `npm run dev` — Turbopack dev server on localhost:3000. Run this (or `npm run build`) once before a standalone `tsc` run so `.next` route types exist.
- `npm run lint` — ESLint across the repo; use `npx eslint <path>` for one file. No formatter is configured.
- `npx tsc --noEmit` — typecheck; `npm run build` is the full verification (typecheck + production build). There is no test runner or `npm test`.

## Auth / environment

- `.env` (gitignored via `.env*`, no example file) needs `MONGO_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, and `GOOGLE_SECRET`. Note `GOOGLE_SECRET` — not the usual `GOOGLE_CLIENT_SECRET`.
- The Mongo database name is hardcoded as `change-nest` in `src/app/lib/auth.ts`; the database named in `MONGO_URI` is ignored.
- Server config: `src/app/lib/auth.ts`. Browser client: `src/app/lib/auth-client.ts` (re-exports `signIn`, `signUp`, `signOut`, `useSession`; profile saving uses `authClient.updateUser`). Catch-all handler: `src/app/api/auth/[...all]/route.ts` (via `toNextJsHandler`). This project uses `src/app/lib/`, not `src/lib/`.
- Import `auth` only in server code and `authClient` only in client components (`"use client"`). In client code call e.g. `authClient.signOut()`; do not import auth helpers from `better-auth/api`. Auth UI calls `authClient` directly; there are no auth server actions.
- Only `/profile` is server-protected: its page calls `auth.api.getSession({ headers: await headers() })` and redirects to `/sign-in`; there is no middleware.

## Styling / UI

- Tailwind CSS v4 runs through the `@tailwindcss/turbopack` loader for all `*.css` in `next.config.ts`, not PostCSS. There is no `tailwind.config.*` or `postcss.config.*`; don't add one for ordinary utility styles.
- `src/app/globals.css` imports both `tailwindcss` and `@heroui/styles`; keep both. HeroUI is v3 (`@heroui/react` 3.x); `src/components/profile/user.tsx` is the only current usage. Don't add a provider or apply v2/NextUI setup from memory.
- Theme tokens are defined in `globals.css` via `@theme`: `brand` (`#16A34A`), `ink` (`#0F172A`), `canvas` (`#F8FAFC`). Use them instead of hard-coded colors.
- Comments are transliterated Bengali ("Banglish"), e.g. `// Error hole red tone hobe.`; user-facing copy stays English. Match that style when adding comments.

## Structure

- Root chrome: `src/app/layout.tsx` (navbar, footer, `ToastContainer`).
- Live navbar: `src/components/nave/Navebar.tsx` (imported by the layout; note the `nave`/`Navebar` spellings).
- Feature components live under `src/components/<feature>/` (e.g. `auth/`, `contact/`, `profile/`); `Banner.tsx` and `Footer.tsx` sit at the `src/components/` top level.
- Only these routes exist: `/`, `/about-us`, `/contact`, `/profile`, `/sign-in`, `/sign-up`, plus `/api/auth/[...all]`. Navbar/footer already link to `/events`, `/events/create`, `/join`, `/terms`, and `/privacy`, which are not implemented.
- `ContactForm` is client-side only: it builds a `mailto:` link, with no API route or email service behind it.
- `@/*` maps to `src/*`; local images live in `src/app/assets/` (`.jpg`) and are imported statically.
- Next 16 generates route prop types (`LayoutProps<"/">`, etc.) into `.next`; use those instead of hand-writing route props.
- React Compiler is enabled; avoid adding memoization solely for render performance.
