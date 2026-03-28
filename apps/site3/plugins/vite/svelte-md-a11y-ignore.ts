import type { Plugin } from 'vite'

export const svelteMdA11YIgnorePlugin = (): Plugin => ({
	name: 'svelte-md-a11y-ignore',
	transform(code, id) {
		if (!id.endsWith('.md') || id.includes('node_modules')) return

		return code.replace(
			/(<pre[^>]*class="[^"]*shiki[^"]*"[^>]*>)/g,
			'<!-- svelte-ignore a11y-no-noninteractive-tabindex -->\n$1',
		)
	},
})
