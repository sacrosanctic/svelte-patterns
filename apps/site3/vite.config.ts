import devtoolsJson from 'vite-plugin-devtools-json'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import svelteMd from 'vite-plugin-svelte-md'
import { snippet } from '@mdit/plugin-snippet'
import { container } from '@mdit/plugin-container'
import { join, resolve } from 'node:path'

const rootPath = resolve(__dirname)

export default defineConfig({
	plugins: [
		tailwindcss(),
		svelteMd({
			markdownItOptions: {},
			use: (md) => {
				// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
				// type incompatibility with markdown-it and markdown-exit
				md.use(container, {
					name: 'code-group',
					// marker: ':',
					openRender: () => `<div class="code-group">\n`,
					closeRender: () => `</div>\n`,
				})
				// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
				// type incompatibility with markdown-it and markdown-exit
				md.use(snippet, {
					currentPath: (env) => env.id,
					resolvePath: (filePath) => {
						if (filePath.startsWith('/')) {
							return join(rootPath, filePath.slice(1))
						}
						if (filePath.startsWith('$lib/')) {
							return join(rootPath, 'src/lib', filePath.slice(5))
						}
						return filePath
					},
				})
				return md
			},
		}),
		sveltekit(),
		devtoolsJson(),
	],
})
