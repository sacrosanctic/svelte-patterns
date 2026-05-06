<script lang="ts">
	import { resolve } from '$app/paths'

	import IconSearch from '~icons/mdi/magnify'
</script>

<a
	href={resolve('/search')}
	class="inline-flex w-56 items-center gap-2.5 rounded-lg border bg-muted/40 px-3.5 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
>
	<IconSearch class="size-4 shrink-0" aria-hidden="true" />
	<span class="flex-1 text-left">Search…</span>
	<kbd
		class="rounded-md border bg-background px-2 py-0.5 text-[11px] font-semibold text-muted-foreground"
	>
		⌘K
	</kbd>
</a>
