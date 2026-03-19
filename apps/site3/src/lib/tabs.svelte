<script lang="ts">
	import { twMerge, type ClassNameValue } from 'tailwind-merge'

	let {
		data,
		class: className,
	}: {
		class: ClassNameValue
		data: string[]
	} = $props()

	let active = $state(0)
</script>

<ul
	class={twMerge('not-prose', className)}
	{@attach (node) => {
		const el = node.parentElement?.nextElementSibling as HTMLElement
		Array.from(el.children).forEach((element) => {
			const el = element as HTMLElement
			el.classList.add('hidden')
		})
		const child = el.firstChild as HTMLElement
		if (child) child.dataset.active = ''
	}}
>
	{#each data as name, i (name)}
		<li
			data-tab={i}
			data-active={i === active ? '' : undefined}
			class={['list-none hover:bg-gray-700/50 data-active:bg-blue-900']}
		>
			<button
				class="rounded-md px-3 py-1.5 text-sm transition-colors"
				onclick={(e) => {
					const el = e.currentTarget.parentElement?.parentElement?.parentElement?.nextElementSibling
					if (!el) return
					const oldChild = el.children[active] as HTMLElement
					if (!oldChild) return
					delete oldChild.dataset.active

					active = i
					const newChild = el.children[active] as HTMLElement
					if (!newChild) return
					newChild.dataset.active = ''

					console.log(el?.children[i])

					// (el.children[i] as HTMLElement).dataset.active = undefined
					active = i
				}}>{name}</button
			>
		</li>
	{/each}
</ul>
