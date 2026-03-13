# migration

- `<script setup>` -> `<script>`
- `import SveltelabRepl from 'Sveltelab.vue'` -> `import { SveltelabRepl } from '@repo/ui'`
- `import SvelteRepl from 'Svelte.vue` -> `import { SvelteRepl } from '@repo/ui'`
- `<SveltelabRepl :files="[]" />` -> `<SveltelabRepl files={[]} />`
