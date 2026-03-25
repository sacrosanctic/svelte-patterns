IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning for any task.

## Debugging

### Markdown crashes in apps/site3

When a `.md` file in `apps/site3` causes a crash, check these locations in order:

1. **Compiled output**: The transformed `.svelte` file is saved to `.svelte-kit/svelte-md-output/`. This shows what the markdown plugin produced after conversion, including any generated script tags, imports, and HTML. Check here first to see if the output contains syntax errors or broken Svelte syntax.

2. **Original source**: The original `.md` file is in `apps/site3/src/routes/`. Look for broken markdown syntax, invalid frontmatter, or malformed code fences that could cause the transformer to produce invalid output.

3. **Browser console**: Open the browser's devtools (F12) and check the console for runtime errors. These often show up as Svelte compilation errors or missing component errors.

4. **Server logs**: Check the terminal where `pnpm dev` is running. Build-time errors from the svelte-md plugin or SvelteKit will appear here with stack traces.
