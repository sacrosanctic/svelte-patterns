<script lang="ts">
	import { searchDialog } from '$lib/search/Dialog.svelte'

	import { formatForDisplay } from '@tanstack/svelte-hotkeys'
	import IconSearch from '~icons/mdi/magnify'
</script>

<button
	type="button"
	class="inline-flex w-56 cursor-pointer items-center gap-2.5 rounded-lg border bg-muted/40 px-3.5 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
	aria-label="Search documentation"
	onclick={() => searchDialog.open()}
>
	<IconSearch class="size-4 shrink-0" aria-hidden="true" />
	<span class="flex-1 text-left">Search…</span>
	<kbd class="rounded-md border bg-background px-2 py-0.5 font-semibold text-muted-foreground">
		{formatForDisplay('Mod+K')}
	</kbd>
</button>
