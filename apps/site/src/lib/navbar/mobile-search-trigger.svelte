<script lang="ts">
	import { searchDialog } from '$lib/search/search-state.svelte'

	import IconSearch from '~icons/mdi/magnify'
</script>

<button
	type="button"
	class="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground sm:hidden"
	aria-label="Search"
	onclick={() => searchDialog.open()}
>
	<IconSearch class="size-5" aria-hidden="true" />
</button>
