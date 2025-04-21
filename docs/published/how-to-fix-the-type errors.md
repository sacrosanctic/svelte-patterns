---
title: How To Fix The Type Errors
publish: false
---

## Debugging Checklist for Type Issues

Running into mysterious red squiggles? Here's a quick checklist to help resolve common type-related issues in SvelteKit.

### ✅ Basic Fixes

- **Restart the dev server**
- **Restart your IDE**
- **Clear the `.svelte-kit` folder**
- **Use [zero-effort type safety](https://svelte.dev/blog/zero-config-type-safety)**  
  SvelteKit infers types automatically. If you're manually typing things like `PageData` or `RequestEvent`, try removing them—they might already be inferred correctly.

### 🔍 Deeper Checks

- **Check your `tsconfig.json`**  
  Is it different from what SvelteKit generates with `npx sv create`?

- **Check `src/app.d.ts`**  
  This is where you define things like `Locals`, `PageData`, and `Platform`.

- **Missing or incorrect `lang="ts"` in Svelte files**  
  If you forget this, TypeScript won't even kick in:
  ```html
  <script lang="ts"></script>
  ```

### 💡 Still stuck?

Make a minimal reproduction and post it in [Svelte Discord](https://svelte.dev/chat).
