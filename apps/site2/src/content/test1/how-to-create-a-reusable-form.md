---
title: How To Create A Reusable Form
description: Learn how to build and reuse form components across different pages in SvelteKit
---

The reusable components.

**Component.svelte:**
```svelte
<!-- Reusable form component implementation -->
```

**form_action.js:**
```js
// Form action implementation
```

**Interactive Example - See source code in ./how-to-create-a-reusable-form/$lib-contact_form-Component.svelte and ./how-to-create-a-reusable-form/$lib-contact_form-form_action.js**

The components being used in different `+page.svelte`

**Main page (routes/+page.svelte):**
```svelte
<!-- Main page using reusable form -->
```

**Main page server (routes/+page.server.js):**
```js
// Server-side logic for main page
```

**Contact page (routes/contact/+page.svelte):**
```svelte
<!-- Contact page using reusable form -->
```

**Contact page server (routes/contact/+page.server.js):**
```js
// Server-side logic for contact page
```

**Interactive Example - See source code in respective files**

## Why repeat the form action on multiple endpoints instead of reusing the endpoint

For progressive enhancement and support for `form` prop.

Form actions are built on top of native forms, on submission, users are redirected to the page the form action is on [[src]](https://svelte.dev/docs/kit/form-actions#Progressive-enhancement-use:enhance). By reusing the same endpoint, users without Javascript enabled may be redirected to routes without a `+page.svelte`.
