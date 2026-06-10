# Design Guide

## Background

This is a documentation site for Svelte patterns, built with a custom SvelteKit doc engine. The design prioritizes readability, clean typography, and minimal distraction. Markdown content is the core — the UI exists to serve it, not compete with it.

Dark mode is handled via `mode-watcher` (toggles a `.dark` class on `<html>`). Tailwind's `dark:` variant is configured to use this class via `@custom-variant dark (&:where(.dark, .dark *))` in `layout.css`. All colors adapt through CSS custom properties, so components never need paired `dark:` utilities.

## Where design lives

| File                                   | Role                                                                                                                                                   |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/routes/layout.css`                | **Single source of truth.** `@theme` block, CSS variables (`:root` / `.dark`), global base styles, scrollbar, callout styles, Shiki code block styles. |
| `src/routes/+layout.svelte`            | Root layout — imports `layout.css`, `<ModeWatcher />`, and `<Navbar />` (site chrome).                                                                 |
| `src/lib/navbar/navbar.svelte`         | Top bar: brand, search trigger, theme toggle, mobile menu for docs.                                                                                    |
| `src/routes/(markdown)/+layout.svelte` | Docs shell — sidebar (`Sidebar`), mobile overlay, `<article>` with prose classes, `<Anchor />` for heading links.                                      |
| `src/lib/sidebar.svelte`               | Docs navigation tree from `page.data.sidebar`.                                                                                                         |
| `src/routes/(markdown)/anchor.svelte`  | Heading anchor links + "Copied!" feedback.                                                                                                             |
| `src/routes/search/+page.svelte`       | Search page UI (input, results list).                                                                                                                  |
| `src/routes/+page.svelte`              | Homepage (minimal).                                                                                                                                    |
| `src/lib/tabs.svelte`                  | Code-group tab switcher used inside markdown.                                                                                                          |

## Color palette

All colors are defined as CSS variables in `layout.css` and mapped to Tailwind via `@theme`.

### Core tokens

| Token             | Light     | Dark      | Tailwind class                                   | Use for                                        |
| ----------------- | --------- | --------- | ------------------------------------------------ | ---------------------------------------------- |
| `--bg`            | `#f5efe5` | `#161413` | `bg-background`                                  | Page background (warm linen / warm near-black) |
| `--fg`            | `#2a2520` | `#e8e0d8` | `text-foreground`                                | Primary text                                   |
| `--primary`       | `#d4541e` | `#ef6c43` | `text-primary`, `bg-primary`                     | Links, active states, accents                  |
| `--primary-hover` | `#b8441a` | `#ff9e7a` | `text-primary-hover`, `hover:text-primary-hover` | Hovered links/buttons                          |
| `--primary-fg`    | `#ffffff` | `#ffffff` | `text-primary-foreground`                        | Text on primary-colored backgrounds            |
| `--muted`         | `#ece4d6` | `#1c1917` | `bg-muted`                                       | Sidebar, subtle panel backgrounds              |
| `--muted-fg`      | `#736860` | `#958880` | `text-muted-foreground`                          | Secondary/placeholder text                     |
| `--border`        | `#ddd4c4` | `#2a2421` | `border-border`                                  | All borders/dividers                           |
| `--ring`          | `#d4541e` | `#ef6c43` | `ring-ring`                                      | Focus outlines                                 |

### When to use what

- **`background` / `foreground`** — default body surface and text. Start here.
- **`primary`** — links, active nav items, selected tabs, brand accents. Use `primary/10` or `primary/20` for tinted backgrounds (e.g. active sidebar item, selected tab).
- **`primary-hover`** — hover state for anything using `primary`.
- **`muted` / `muted-foreground`** — sidebar backgrounds, placeholder text, secondary labels, "no results" messages. Use `muted-foreground/10` or `muted-foreground/20` for subtle hover states on list items.
- **`border`** — every border and divider. Applied globally via `* { @apply border-border outline-ring/50 }` (border color + default outline color).
- **`ring`** — focus-visible outlines. Applied globally on `button` and `a`.

### Callout colors

Each callout variant (info, tip, warning, danger, details) has three tokens: `--callout-{variant}-bg`, `--callout-{variant}-border`, `--callout-{variant}-title`. These have separate light/dark values. Callout HTML is generated by markdown-it plugins in `vite.config.ts`.

## Typography

Markdown content uses `@tailwindcss/typography` prose classes. Do **not** add raw base styles for headings, paragraphs, or lists — they will conflict with prose.

Dark mode prose is handled by `dark:prose-invert`, which works correctly because the `dark:` variant is bound to the `.dark` class (see Background section above).

The docs article applies (see `(markdown)/+layout.svelte`):

```css
prose sm:prose-sm md:prose-base lg:prose-lg xl:prose-xl
prose-a:text-primary prose-a:decoration-primary/30 prose-a:hover:decoration-primary
prose-inline-code:rounded prose-inline-code:outline prose-inline-code:outline-border
prose-code:before:content-none prose-code:after:content-none
prose-pre:border prose-pre:border-border
dark:prose-invert
```

## Practices

- **No `dark:` utilities in components.** Colors adapt via CSS variables. The only exception is `dark:prose-invert` (required by the typography plugin for dark mode).
- **Opacity modifiers over new tokens.** For tinted backgrounds, use `bg-primary/10` rather than defining a new variable.
- **Global focus ring.** All `<button>` and `<a>` elements get `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none` via `layout.css`. Don't re-declare it per component.
- **Global border color.** `* { @apply border-border ... }` sets default border color on all elements; you still use Tailwind `border` utilities where you need a visible border — the color comes from the token.
- **Smooth theme transitions.** `body` has `transition: background-color 0.3s ease, color 0.3s ease`.
- **Scrollbar stability.** `html { scrollbar-gutter: stable }` prevents layout shift when content grows.
- **Selection color.** Text selection uses `bg-primary/20 text-primary`.
