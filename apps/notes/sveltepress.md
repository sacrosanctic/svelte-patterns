# SveltePress Analysis

## Implementation Approach
SveltePress is a site build tool inspired by VitePress, built on SvelteKit and UnoCSS. It uses SvelteKit's project structure but allows .md files for pages and layouts. Preserves full SvelteKit power for server-side logic. Layout hierarchy: theme.globalLayout > root layout > theme.pageLayout > sub layouts > page. Configured via @sveltepress/vite plugin. Deploys with SvelteKit adapters (default static).

## Key Features
- **Markdown Centered**: Write with minimal config, supports frontmatter
- **Svelte in Markdown**: Embed Svelte 3/4 components in .md files
- **Type Friendly**: Fully typed with TypeScript
- **Theme Customizable**: Default theme, community themes, or custom
- **Default Theme Features**: Navbar, sidebar, home page, built-in components, admonitions, code highlighting (Shiki), Twoslash, UnoCSS, Docsearch, PWA, Google Analytics
- **Full SvelteKit Power**: Server-side logic, authentication, DB integration