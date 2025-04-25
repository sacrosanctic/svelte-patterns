---
title: How To Create A Reusable Form
---

<script setup>
import SveltelabRepl from '../../Sveltelab.vue'
import A from './how-to-create-a-reusable-form/$lib-contact_form-Component.svelte?raw'
import B from './how-to-create-a-reusable-form/$lib-contact_form-form_action.js?raw'
import C from './how-to-create-a-reusable-form/routes-+page.server.js?raw'
import D from './how-to-create-a-reusable-form/routes-+page.svelte?raw'
import E from './how-to-create-a-reusable-form/routes-contact-+page.server.js?raw'
import F from './how-to-create-a-reusable-form/routes-contact-+page.svelte?raw'
import G from './how-to-create-a-reusable-form/routes-+layout.svelte?raw'
</script>

The reusable components.
:::code-group
<<< ./how-to-create-a-reusable-form/$lib-contact_form-Component.svelte [$lib/contact_form/Component.svelte]
<<< ./how-to-create-a-reusable-form/$lib-contact_form-form_action.js [$lib/contact_form/form_action.js]
:::

---

The components being used in different `+page.svelte`
:::code-group

<<< ./how-to-create-a-reusable-form/routes-+page.svelte [routes/+page.svelte]
<<< ./how-to-create-a-reusable-form/routes-+page.server.js [routes/+page.server.js]
<<< ./how-to-create-a-reusable-form/routes-contact-+page.svelte [routes/contact/+page.svelte]
<<< ./how-to-create-a-reusable-form/routes-contact-+page.server.js [routes/contact/+page.server.js]
:::
<SveltelabRepl :files="[
{contents: A ,name:'src/lib/contact_form/Component.svelte',},
{contents: B ,name:'src/lib/contact_form/form_action.js',},
{contents: C ,name:'src/routes/+page.server.js',},
{contents: D ,name:'src/routes/+page.svelte',},
{contents: E ,name:'src/routes/contact/+page.server.js',},
{contents: F ,name:'src/routes/contact/+page.svelte',},
{contents: G,name: 'src/routes/+layout.svelte'}
]" />

## Why repeat the form action on multiple endpoints instead of reusing the endpoint

For progressive anhancement and support for `form` prop.

Form actions are built on top of native forms, on submission, users are redirected to the page the form action is on [[src]](https://svelte.dev/docs/kit/form-actions#Progressive-enhancement-use:enhance). By reusing the same endpoint, users without Javascript enabled may be redirected to routes without a `+page.svelte`.
