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
	import type { DocEntry } from '$lib/content'

	import { resolve } from '$app/paths'
	import { page } from '$app/state'

	import IconChevronRight from '~icons/mdi/chevron-right'

	export type Props = {
		groups: SidebarGroup[]
	}

	type SidebarGroup = {
		items: DocEntry[]
		label: string
		section: DocEntry['section']
	}

	let { groups }: Props = $props()

	const isActive = (section: string, slug: string) => `/${section}/${slug}` === page.url.pathname

	const groupIsActive = (group: SidebarGroup) =>
		group.items.some((item) => isActive(group.section, item.slug))

	// svelte-ignore state_referenced_locally
	let expanded: Record<string, boolean> = $state(
		Object.fromEntries(groups.map((g) => [g.section, groupIsActive(g)])),
	)

	$effect(() => {
		void page.url.pathname
		const active = groups.find(groupIsActive)
		if (active) {
			expanded[active.section] = true
		}
	})

	const toggle = (section: string) => {
		expanded[section] = !expanded[section]
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

	{#each groups as group (group.section)}
		{@const open = expanded[group.section] ?? false}
		{@const panelId = `sidebar-group-${group.section}`}

		<div class="mt-2">
			<button
				type="button"
				class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase transition hover:text-foreground"
				aria-expanded={open}
				aria-controls={panelId}
				onclick={() => toggle(group.section)}
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
					{#each group.items as { slug, title } (slug)}
						<li>
							<a
								href={resolve(`/(markdown)/${group.section}/[...slug]`, { slug })}
								class={[
									'block rounded-md px-3 py-1.5 pl-8 text-sm transition',
									isActive(group.section, slug)
										? 'bg-primary/10 font-medium text-primary'
										: 'text-foreground hover:bg-muted-foreground/10',
								]}
								aria-current={isActive(group.section, slug) ? 'page' : undefined}
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
