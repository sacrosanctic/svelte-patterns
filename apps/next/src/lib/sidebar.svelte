<script lang="ts" module>
	class SidebarState {
		current = $state(false)

		toggle() {
			this.current = !this.current
		}
	}

	export const sidebar = new SidebarState()
</script>

<script lang="ts">
	import { afterNavigate } from '$app/navigation'
	import { resolve } from '$app/paths'
	import { page } from '$app/state'

	import { categories, type Md } from '$lib/content'

	import IconChevronRight from '~icons/mdi/chevron-right'

	export type Props = {
		groups: SidebarGroup[]
	}

	type SidebarGroup = {
		category: Md['fm']['category']
		items: Md[]
		label: string
	}

	let { groups }: Props = $props()

	let expanded: Record<string, boolean> = $state(
		Object.fromEntries(categories.map((c) => [c, false])),
	)

	afterNavigate(() => {
		if (page.data.md.fm.category) {
			expanded[page.data.md.fm.category] = true
		}
	})

	const toggle = (category: string) => {
		expanded[category] = !expanded[category]
	}
</script>

<div class="flex flex-col gap-1 p-4 md:py-8">
	<a
		href={resolve('/(markdown)/introduction')}
		class={[
			'block rounded-md px-3 py-2 text-sm font-medium transition',
			page.url.pathname === '/introduction'
				? 'bg-primary/10 text-primary'
				: 'text-foreground hover:bg-muted-foreground/10',
		]}
		aria-current={page.url.pathname === '/introduction' ? 'page' : undefined}
	>
		Introduction
	</a>

	{#each groups as group (group.category)}
		{@const open = expanded[group.category] ?? false}
		{@const panelId = `sidebar-group-${group.category}`}

		<div class="mt-2">
			<button
				type="button"
				class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase transition hover:text-foreground"
				aria-expanded={open}
				aria-controls={panelId}
				onclick={() => toggle(group.category)}
			>
				<IconChevronRight
					class={`size-3.5 shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}
					aria-hidden="true"
				/>
				{group.label}
			</button>

			<div
				id={panelId}
				role="group"
				aria-label={group.label}
				class="grid transition-[grid-template-rows] duration-200 ease-out"
				style:grid-template-rows={open ? '1fr' : '0fr'}
			>
				<ul class="overflow-hidden">
					{#each group.items as { fm: { title }, slug } (slug)}
						<li>
							<a
								href={resolve('/(markdown)/[...slug]', { slug })}
								class={[
									// Base styles
									'block rounded-md px-3 py-1.5 pl-8 text-sm transition-colors',
									// Inactive / Default state
									'text-foreground hover:bg-muted-foreground/10',
									// Active state (aria-current="page")
									'aria-[current=page]:bg-primary/10 aria-[current=page]:font-medium aria-[current=page]:text-primary aria-[current=page]:hover:bg-primary/20',
								]}
								aria-current={`/${slug}` === page.url.pathname ? 'page' : undefined}
							>
								{title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/each}
</div>
