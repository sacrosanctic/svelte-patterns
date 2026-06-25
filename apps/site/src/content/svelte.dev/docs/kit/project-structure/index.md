# How to Organize a Project

> Code that changes together, stays together

This topic can be highly subjective, so I present the possible options and tradeoffs so you can make informed decisions.

## Key Tensions

There are a few fundamental tensions when it comes to code organization. Every decision you make trades one thing for another. Understanding the tradeoffs helps you pick the right approach for your situation.

### Code Splitting

Why do you want to split code in the first place:

- **Cohesion**: similar code can be placed closer together, making it easier to find
- **Better git diffs**: can be easily grokked just from the file names
- **Namespacing**: files become documentation, the filename tells you what lives inside

What are the costs:

- **Indirection**: code flow is no longer sequential, you have to jump around
- **Larger blast radius**: to understand a process, you now need to understand multiple files and their relationships
- **Increased scaffolding**: more LOC just for imports and prop drilling
- **Styles become disjointed**: Svelte's scoped styles makes this harder

Since Svelte uses a compiler, there are no concerns about efficiency, just organization.

### Organic vs Pre-Planned

#### Organic (start simple, refactor when it hurts)

Start with a single `index.ts` or `+page.svelte`. When things get messy, you refactor. Over time, patterns emerge and you formalize them.

This works well when:

- You're in a greenfield project with unclear requirements
- The team is small
- You want to move fast and discover the structure through use

#### Pre-Planned (define structure before coding)

You decide on the structure upfront. Module boundaries, naming conventions, placement rules. You may even write code to enforce the structure.

This works well when:

- The domain is well-understood
- Teams need clear contracts before coding
- You want to reduce decisions during implementation

### Separation of Concerns

When you split code, you're choosing a **concern** to separate. The question is how you define those boundaries.

#### Feature-Based

```
src/
├── routes/
│   ├── blog/
│   │   ├── +page.svelte
│   │   ├── +page.ts
│   │   ├── +page.server.ts
│   │   ├── components/
│   │   │   ├── PostCard.svelte
│   │   │   └── AuthorBadge.svelte
│   │   ├── utils.ts
│   │   └── types.ts
│   └── auth/
│       ├── login/
│       │   └── +page.svelte
│       └── register/
│           └── +page.svelte
└── lib/
    ├── components/
    │   ├── Button.svelte
    │   └── Modal.svelte
    └── server/
        └── db.ts
```

Everything the blog feature needs lives in `routes/blog/`. When you redesign the blog, almost everything you need is in one place.

Feature-based shines when:

- Features are relatively independent
- Different teams work on different features
- You want to delete or copy a feature as a unit

#### Technical-Based

Technical-based organization groups everything of the same type together:

```
src/
├── routes/
│   ├── blog/
│   │   └── +page.svelte
│   └── auth/
│       ├── login/
│       │   └── +page.svelte
│       └── register/
│           └── +page.svelte
└── lib/
    ├── components/
    │   ├── blog/
    │   │   ├── PostCard.svelte
    │   │   └── AuthorBadge.svelte
    │   ├── Button.svelte
    │   └── Modal.svelte
    ├── remote/
    │   └── blog.remote.ts
    ├── hooks/
    │   └── rate-limiter.ts
		├── server/
    │   ├── db.ts
    │   ├── blog.server.ts
    │   └── auth.server.ts
    └── utils/
        ├── format.ts
        └── validate.ts

```

All components live together, all load functions live together, all server logic lives together. When you change your database ORM, you know exactly where all database calls are.

Technical-based shines when:

- There's significant shared code between features
- The team is small and everyone touches everything

#### Similar Terms

| feature               | technical            |
| --------------------- | -------------------- |
| vertical slices       | horizontal slices    |
| feature-sliced design | layered architecture |
| logical boundary      | technical boundary   |

## Recommendation

Start organic. Use SvelteKit's defaults which colocate route files by default. When code is truly shared across routes, extract it into `$lib`.

The practical approach:

1. Start with everything colocated in the route
2. When you see a pattern three times, consider extracting
3. When you extract, be intentional—name things clearly, define interfaces
4. When extraction hurts more than it helps, undo it

**The $lib trap**: don't extract "for later reuse". If only one route uses it, it belongs with that route. Move to `$lib` when you actually have a second consumer.

## Tips and Tricks

### Import `+page.svelte`

Did you know, `+page.svelte` files are just regular Svelte components. You can import them directly:

```svelte
<script>
	import BlogPost from '../../+page.svelte'
</script>
```

Better yet, we can add a `$routes` alias that points to your routes directory. So your routes and code share the same folder structure

:::code-group

```svelte [+page.svelte]
<script>
	import BlogPost from '$routes/blog/+page.svelte'
</script>
```

```ts [vite.config.ts]
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$routes: 'src/routes'
		}
	}
});
```

:::

### Colocation

SvelteKit defaults to keeping route files together, you can additonally ad your own files here too

```
routes/blog/
├── +page.svelte      <- page component
├── +page.ts          <- load function
├── +page.server.ts   <- server-only logic
```

### $lib

`$lib` is your shared library. Code importable from anywhere via the `$lib` alias:

Use `$lib` for:

- Reusable components used across routes (`Button`, `Modal`)
- Utility functions used in multiple places (`formatDate`, `validate`)
- Shared types
- Configuration

### `.server` Files

Files ending in `.server.ts` or placed in `$lib/server` are server-only. They are never included in the client bundle.

Use them for:

- Database clients
- Authentication logic
- File system access
- Other server-only operations

### Route Groups

Parentheses create route groups that share layouts without affecting URLs:

```
routes/
├── (marketing)/
│   ├── about/
│   │   └── +page.svelte
│   ├── pricing/
│   │   └── +page.svelte
│   └── +layout.svelte    <- shared by about and pricing
└── (app)/
    ├── dashboard/
    │   └── +page.svelte
    └── +layout.svelte    <- shared by dashboard
```

## FAQ

### When to use components vs snippets

Both components and snippets let you reuse markup, but they serve different purposes.

**Use components when:**

- You need `<script>` or `<style>` blocks
- You need lifecycle hooks (`onMount`, `onDestroy`)
- The code is reused in multiple unrelated places

**Use snippets when:**

- You have repeated markup

Think of snippets as sub-components. They are leaner in syntax but don't have all the features of a component.

### My component is getting large. Should I split it up?

Maybe. Ask yourself:

- Is the component doing multiple distinct things? Split into smaller components.
- Is one section particularly complex? Extract just that part.
- Is the complexity necessary or could it be simplified?

If you're not sure, leave it. You can always split later, but splitting and then merging is more work.

### I inherited a messy project. Where do I start?

Don't restructure for the sake of restructuring. Instead:

1. Make the next change in the right place
2. When something is hard to find, move it
3. When an abstraction causes problems, undo it

Incremental improvements beat big rewrites. The structure will clarify as you work.

## Glossary

### Single Use Abstractions

Where code is split off into a separate function or file and only imported once.
