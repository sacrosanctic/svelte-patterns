---
title: How To Make A Reproduction
---

## Via svelte.dev/playground

:::info
Ideal for simple, focused issues.
:::

- go to https://svelte.dev/playground
- Paste the relevant code into the playground
- Remove code that does not affect the issue
- share the link

## Via sveltelab.dev

:::info
Best for reproductions that require SvelteKit.
:::

- go to https://sveltelab.dev
- Paste the relevant code into the playground
- Remove code that does not affect the issue
- share the link

## Via Github

::: info
For cases where a real environment is needed.
:::

- `npx sv create my-repro --template minimal --no-add-ons --types ts --no-install`
- `cd my-repro`
- `git init && git add --all && git commit -m "Initial commit"`
- Add the code that is relevant to the issue
- `git add --all && git commit -m "Reproduce issue"`
- Push to Github
- Share the link

## Via Instructions

::: info
Useful when the issue lies in the process itself.
:::

````md
I ran the following non-interactive commands to initialize the project

```bash
npx sv create my-repro --template minimal --no-add-ons --types ts --no-install
```

Added the following block of code to `src/routes/about/+page.svelte`

```svelte
<script>
	let count = $state(o)
</script>

{count}
```

Then ran

```bash
npm install
npm run dev
```

Open the browser to `http://localhost:5173/about`

Here, you can see `/about` fails to load and returns a `404`.
````

## References and Prior Art

- [Why repros are important - Rich Harris](https://www.youtube.com/watch?v=dB_YjuAMH3o&t=1375s)
- https://sveltepatterns.dev/minimal-reproducible-example
- https://en.wikipedia.org/wiki/Minimal_reproducible_example
- https://stackoverflow.com/help/minimal-reproducible-example
