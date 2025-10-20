---
title: How To Prototype
publish: false
tags:
---

## Describe the problem

Based on the commands in the document, this scaffolding process is designed for rapidly prototyping a full-stack Svelte application with a pre-configured set of tools and libraries. Here's a breakdown of the core ideas:

- **Minimal SvelteKit Base:** It starts with a minimal SvelteKit template (`--template minimal`) to avoid unnecessary boilerplate, giving you a clean foundation.
- **Immediate Code Quality:** It immediately adds and configures ESLint and Prettier. This enforces a consistent code style and helps catch errors early, which is crucial even in a prototype.
- **Dual-Approach to Styling:**
  - **Pico.css:** This is included for a clean, semantic, and good-looking default style with minimal effort. The `.pico` class in the Svelte component suggests it's used as a baseline.
  - **Tailwind CSS:** This is added for utility-first styling, allowing for rapid and custom UI development without writing a lot of custom CSS.
- **Authentication Out-of-the-Box:** It integrates `better-auth`, which seems to be a library for handling authentication. This is often a complex part of an application, so having it set up from the start is a significant time-saver.
- **Database and Migrations:** The inclusion of `pg` (the Node.js driver for PostgreSQL) and the database migration command (`@better-auth/cli migrate`) indicates that this scaffold is intended for applications with a database.
- **Cloud-Ready:** The Vercel integration (`vercel login`, `pnpm link`, `pnpm pull env .env.local`) shows that the prototype is designed to be easily deployed and connected to a cloud database from the beginning.

In essence, the idea is to have a "batteries-included" starting point for a Svelte application that goes beyond a simple frontend. It automates the tedious setup for a full-stack application, allowing you to focus on building the actual features of your prototype immediately.

```bash
pnpm dlx sv create . --template minimal --no-add-ons --types ts --no-install
pnpm dlx sv add tailwindcss --tailwindcss none --no-install
pnpm dlx sv add eslint --no-install
pnpm dlx sv add prettier --no-install
pnpm add @picocss/pico
{ echo "@import '@picocss/pico/css/pico.conditional.min.css';"; cat src/app.css; } > src/app.tmp && mv src/app.tmp src/app.css
pnpm i
pnpm add better-auth
```

```bash
pnpm add -g vercel
vercel login
vercel link
# vercel setup db
vercel env pull .env.local
```

```bash
pnpm add -D better-auth pg @types/pg
touch ./src/lib/auth.ts

```

Create a file at `./src/lib/auth.ts` with the following content:

```typescript
import { betterAuth } from 'better-auth'
import { Pool } from 'pg'
import { DATABASE_URL } from '$env/static/private'

export const auth = betterAuth({
	database: new Pool({
		connectionString: DATABASE_URL,
		ssl: { rejectUnauthorized: false },
	}),
})
```

Then run the database migrations:

```bash
pnpm dlx @sacrosanctic/vite-run@latest @better-auth/cli migrate
```

:::code-group

```svelte [routes/+page.svelte]
<!-- ... -->

<div class="contents pico">
	{@render children?.()}
</div>
```

## Reference
