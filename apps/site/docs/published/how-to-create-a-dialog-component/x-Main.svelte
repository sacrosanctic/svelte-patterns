<script>
	import { open } from './Dialog.svelte'
</script>

{#snippet prompt(onclick)}
	<h1>Dialog</h1>

	<form method="dialog"><button>Close via HTML</button></form>
	<p>or</p>
	<button {onclick}>Close via JS</button>
{/snippet}

<button onclick={() => open(prompt)}>Open prompt</button>
<button onclick={() => open()}>Open fallback</button>
