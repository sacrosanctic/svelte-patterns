---
title: How To Prototype
publish: false
tags:
---

## Describe the problem

:::code-group

```bash [init.sh]
pnpm dlx sv create . --template minimal --no-add-ons --types ts --no-install
pnpm dlx sv add tailwindcss --tailwindcss none --no-install
pnpm dlx sv add eslint --no-install
pnpm dlx sv add prettier --no-install
pnpm add -D @picocss/pico better-auth pg @types/pg
{ echo "@import '@picocss/pico/css/pico.conditional.min.css';"; cat src/app.css; } > src/app.tmp && mv src/app.tmp src/app.css

pnpm add -g vercel@latest
vercel login
vercel link
# vercel setup db
vercel env pull .env.local

touch ./src/lib/auth.ts
```

```ts [lib/auth.ts]
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

```svelte [routes/+page.svelte]
<!-- ... -->

<div class="contents pico">
	{@render children?.()}
</div>
```

:::

## Reference
