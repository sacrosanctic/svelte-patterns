---
title: How To Make A Breadcrumb Component
publish: false
tags: component
---

<script setup>
import SveltelabRepl from '../../Sveltelab.vue'
import A from './how-to-make-a-breadcrumb-component/+layout.svelte?raw'
import B from './how-to-make-a-breadcrumb-component/Breadcrumb.svelte?raw'
import C from './how-to-make-a-breadcrumb-component/segment1+layout.js?raw'
import D from './how-to-make-a-breadcrumb-component/segment2+layout.js?raw'
</script>

## URL Based

> [!caution] This currently doesnt work, awaiting for this https://github.com/sveltejs/kit/issues/13690

This setup assumes the breadcrumb has a 1 to 1 mapping to the url.

:::code-group

<<< ./how-to-make-a-breadcrumb-component/+layout.svelte
<<< ./how-to-make-a-breadcrumb-component/Breadcrumb.svelte [lib/Breadcrumb.svelte]
<<< ./how-to-make-a-breadcrumb-component/segment1+layout.js [.../[school_id]/+layout.js]
<<< ./how-to-make-a-breadcrumb-component/segment2+layout.js [.../[class_id]/+layout.js]

:::

<SveltelabRepl :files="[
{contents: A ,name:'src/routes/+layout.svelte'},
{contents: B ,name:'src/lib/Breadcrumb.svelte',},
{contents: '<h1>Home</h1>' ,name:'src/routes/+page.svelte',},
{contents: '<h1>List of Schools</h1>' ,name:'src/routes/schools/+page.svelte',},
{contents: C ,name:'src/routes/schools/[school_id]/+layout.js',},
{contents: '<h1>Specific School</h1>' ,name:'src/routes/schools/[school_id]/+page.svelte',},
{contents: '<h1>List of Classes</h1>' ,name:'src/routes/schools/[school_id]/classes/+page.svelte',},
{contents: D ,name:'src/routes/schools/[school_id]/classes/[class_id]/+layout.js',},
{contents: '<h1>Specific Class</h1>' ,name:'src/routes/schools/[school_id]/classes/[class_id]/+page.svelte',},
{contents: '<h1>Attendance List</h1>' ,name:'src/routes/schools/[school_id]/classes/[class_id]/attendance/+page.svelte',},
]" />

## History Based

In this case, the url is flat, and the breadcrumb is generated based on navigation and stored locally. (Todo, figure out which storage is best fit for this kind of data, localstorage, sessionstorage, cookie, snapshot)
