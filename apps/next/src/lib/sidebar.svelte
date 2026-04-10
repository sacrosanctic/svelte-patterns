<script lang="ts">
	import type { SidebarGroup } from '$lib/content'

	import { resolve } from '$app/paths'
	import { page } from '$app/state'

	type Props = {
		groups: SidebarGroup[]
	}

	let { groups }: Props = $props()

	// TODO: I know, I know, all of this looks messy
	// and it's dangerous to ship this to main because it'd be ironic lol
	// but I'll improve it later

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
				<svg
					class={[
						'size-3.5 shrink-0 transition-transform duration-200',
						open ? 'rotate-90' : 'rotate-0',
					]}
					aria-hidden="true"
					viewBox="0 0 16 16"
					fill="currentColor"
				>
					<path
						d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"
					/>
				</svg>
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
