<script>
	import { open } from './Dialog.svelte'
</script>

{#snippet prompt()}
	<h1>Dialog</h1>
	This is the body.
{/snippet}

<button onclick={() => open(prompt)}>Open prompt</button>
<button onclick={() => open()}>Open fallback</button>
