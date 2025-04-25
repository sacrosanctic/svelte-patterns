<script>
	import Dialog, { open } from './Dialog.svelte'
</script>

<!-- This component can be put anymore, usually in +layout.svelte -->
<Dialog>
	<!-- Fallback is optional -->
	<!-- <Dialog /> is enough -->
	<h1>Fallback</h1>

	<form method="dialog"><button>HTML Close</button></form>
</Dialog>

{#snippet prompt(onclick)}
	<h1>Dialog</h1>

	<form method="dialog"><button>HTML Close</button></form>
	<p>or</p>
	<button {onclick}>JS Close</button>
{/snippet}

<button onclick={() => open(prompt)}>Open prompt</button>
<button onclick={() => open()}>Open fallback</button>
