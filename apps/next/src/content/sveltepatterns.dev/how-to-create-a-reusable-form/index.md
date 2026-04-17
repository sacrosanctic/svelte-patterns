---
title: How To Create A Reusable Form
category: faq
superceded by: '[Remote Functions](https://svelte.dev/docs/kit/remote-functions)'
---

The reusable components.
:::sveltelab-repl
<<< ./$lib-contact_form-Component.svelte [$lib/contact_form/Component.svelte]
<<< ./$lib-contact_form-form_action.js [$lib/contact_form/form_action.js]
:::

---

The components being used in different `+page.svelte`
:::sveltelab-repl
<<< ./routes-+page.svelte [src/routes/+page.svelte]
<<< ./routes-+page.s.js [src/routes/+page.server.js]
<<< ./routes-+layout.svelte [src/routes/+layout.svelte]
<<< ./routes-contact-+page.svelte [src/routes/contact/+page.svelte]
<<< ./routes-contact-+page.s.js [src/routes/contact/+page.server.js]
:::

## Why repeat the form action on multiple endpoints instead of reusing the endpoint

For progressive enhancement and support for `form` prop.

Form actions are built on top of native forms, on submission, users are redirected to the page the form action is on [[src]](https://svelte.dev/docs/kit/form-actions#Progressive-enhancement-use:enhance). By reusing the same endpoint, users without Javascript enabled may be redirected to routes without a `+page.svelte`.
