<script>
	import { page } from '$app/state'
	import Breadcrumb from '$lib/Breadcrumb.svelte'

	let { children } = $props()
</script>

<Breadcrumb />

<hr />
<p>current URL: {page.url.pathname}</p>
<a href="/">Home</a><br />
<a href="/schools">Segment 1</a><br />
<a href="/schools/id-foo">Segment 2</a><br />
<a href="/schools/id-foo/classes">Segment 3</a><br />
<a href="/schools/id-foo/classes/id-bar">Segment 4</a><br />
<a href="/schools/id-foo/classes/id-bar/attendance">Segment 5</a>

<pre>page.data: {JSON.stringify(page.data, null, 2)}</pre>
<pre>page.params: {JSON.stringify(page.params, null, 2)}</pre>

{@render children()}
