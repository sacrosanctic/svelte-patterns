<script>
	import Dialog, { open } from './Dialog.svelte'
</script>

<button onclick={open}>Open dialog</button>

<Dialog>
	<h1>Hello!</h1>
</Dialog>
