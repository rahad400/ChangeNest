<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Single-package Next.js 16 App Router site; source lives under `src/` (README's `app/page.tsx` path is stale — the home route is `src/app/page.tsx`). No tests, CI, or monorepo. Auth is Better Auth + MongoDB; everything else is static UI.

## Commands

- Install with npm (`package-lock.json` is the only lockfile); ignore the README's yarn/pnpm/bun alternatives.
- `npm run dev` — Turbopack dev server on localhost:3000.
- `npm run lint`, or `npx eslint <path>` for one file.
- `npx tsc --noEmit` — typecheck; `npm run build` also typechecks and is the full verification.
- There is no `npm test`; no test runner is configured.

## Auth / environment

- Requires `MONGO_URI`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` in `.env`; Google auth also needs `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`. `.env*` is gitignored and there is no example file.
- Server config: `src/app/lib/auth.ts`. Browser client: `src/app/lib/auth-client.ts`. Catch-all handler: `src/app/api/auth/[...all]/route.ts` (via `toNextJsHandler`). This project uses `src/app/lib/`, not `src/lib/`.
- Import `auth` only in server code and `authClient` only in client components (`"use client"`); the client re-exports `signIn`, `signUp`, and `useSession`.
- Sign-up and sign-in (email/password + Google OAuth) are wired to Better Auth in `src/components/auth/SignUpForm.tsx` and `src/components/auth/SignInForm.tsx`.

## Styling / UI

- Tailwind CSS v4 runs through the `@tailwindcss/turbopack` loader for all `*.css` in `next.config.ts`, not PostCSS. There is no `tailwind.config.*` or `postcss.config.*`; don't add one for ordinary utility styles.
- `src/app/globals.css` imports both `tailwindcss` and `@heroui/styles`; keep both.
- HeroUI is v3 (`@heroui/react`): no provider wrapper, and it uses the v3 compound component APIs. Don't apply v2/NextUI setup from memory.
- Use the theme tokens: `brand` (`#16A34A`), `ink` (`#0F172A`), `canvas` (`#F8FAFC`), plus white.

## Structure

- Root chrome: `src/app/layout.tsx` (navbar, footer, `ToastContainer`).
- Live navbar: `src/components/nave/Navebar.tsx` (imported by the layout; note the `nave`/`Navebar` spellings).
- Feature components live under `src/components/<feature>/` (e.g. `auth/`, `contact/`).
- `@/*` maps to `src/*`.
- Next 16 generates route prop types (`LayoutProps<"/">`, etc.); use those instead of hand-writing route props.
- React Compiler is enabled; avoid adding memoization solely for render performance.
