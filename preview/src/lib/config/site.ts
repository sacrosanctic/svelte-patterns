import { defineSiteConfig } from '@svecodocs/kit'

export const siteConfig = defineSiteConfig({
	name: 'Svelte Patterns',
	url: 'https://sveltepatterns.dev',
	description: 'Magical utilities for Svelte 5.',
	links: {
		github: 'https://github.com/sacrosanctic/svelte-patterns',
	},
	author: 'Sacrosanctic',
	keywords: [
		'svelte runes',
		'how to',
		'guide',
		'tutorial',
		'svelte helpers',
		'svelte utils',
		'svelte functions',
	],
	ogImage: {
		url: 'https://runed.dev/og.png',
		width: '1200',
		height: '630',
	},
})
