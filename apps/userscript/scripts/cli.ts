import { build, getUserscriptManagerOutDir } from '@bluwy/usb'

await build({
	input: 'src/index.ts',
	outDir: 'dist',
	copyOutDir: [getUserscriptManagerOutDir('Userscripts')],
	watch: process.argv[2] === 'dev',
	userscriptMeta: {
		name: 'Sveltepatterns Link',
		namespace: 'https://github.com/sacrosanctic/svelte-patterns/tree/main/apps/userscript',
		match: 'https://svelte.dev*',
		icon: 'https://www.google.com/s2/favicons?sz=64&domain=svelte.dev',
		grant: 'none',
		'inject-into': 'content', // required to bypass CSP
		'run-at': 'document-start',
	},
})
