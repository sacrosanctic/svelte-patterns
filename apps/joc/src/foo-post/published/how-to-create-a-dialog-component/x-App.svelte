<script>
	import Dialog, { open } from './Dialog.svelte'
	import Main from './Main.svelte'
</script>

<Dialog>
	<!-- Fallback -->
	<h1>Something went wrong</h1>

	Please close this dialog and try again.

	<form method="dialog"><button>Close via HTML</button></form>
</Dialog>

<!-- Fallback is optional -->
<!-- <Dialog /> is enough -->

<Main></Main>
