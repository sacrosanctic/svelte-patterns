---
title: How To Prototype
publish: false
tags:
---

## Describe the problem

## placeholder title

```bash
pnpm dlx sv create . --template minimal  --no-add-ons --types ts --no-install
pnpm dlx sv add tailwindcss --tailwindcss none --no-install
pnpm dlx sv add eslint --no-install
pnpm dlx sv add prettier --no-install
pnpm add @picocss/pico
{ echo "@import '@picocss/pico/css/pico.conditional.min.css';"; cat src/app.css; } > src/app.tmp && mv src/app.tmp src/app.css
pnpm i
pnpm add better-auth
pnpm
```

```bash
pnpm add vercel -g
pnpm login
pnpm link
# vercel setup db
pnpm pull env .env.local
```

```bash
pnpm add -D better-auth pg @types/pg
touch ./src/lib/auth.ts

import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL as string,
    ssl: { rejectUnauthorized: false },
  }),
});

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
