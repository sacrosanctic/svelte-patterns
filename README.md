## Create a sveltekit template

```bash
pnpm dlx sv create . --template minimal  --no-add-ons --types ts --no-install
pnpm dlx sv add tailwindcss --tailwindcss none --no-install
pnpm i
pnpm dlx shadcn-svelte@next init
pnpm dlx shadcn-svelte@next add button -y -o
pnpm check
```

## create a output.json

```bash
pnpm dlx jiti ./test.js ./template
```

## Working list of tags

### meta categories

- pattern
- faq (frequently asked question)

### area of code

- form
- kit
- router
- svelte-5
- meta (metaprogramming / scripting)
- css
- tailwind
