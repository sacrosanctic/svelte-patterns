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
			use: (md) =>
				md
					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
					// type incompatibility with markdown-it and markdown-exit
					.use(container, {
						name: 'code-group',
						openRender: (tokens, index) => {
							const endIndex = tokens.findIndex(
								(token) => token.type === 'container_code-group_close',
							)

							const children = tokens.slice(index + 1, endIndex)
							const tabNames: string[] = []

							children.forEach((child) => {
								if (child.type !== 'fence') return

								const src = child.meta?.src || ''
								const match = src.match(/^(.+?)\s+\[([^\]]+)\]$/)

								if (match) {
									const [, path, name] = match
									child.meta.src = path // Clean path for snippet plugin
									tabNames.push(name)
								} else {
									// Default: use filename as tab name
									tabNames.push(src.split('/').pop())
								}
							})

							// Build tab list HTML
							const tabsHtml =
								tabNames.length > 0
									? `<ul class="code-group-tabs" data-tabs="${tabNames.map((_, i) => i).join(',')}">
                ${tabNames
									.map(
										(name, i) =>
											`<li data-tab="${i}"${i === 0 ? ' class="active"' : ''}>${name}</li>`,
									)
									.join('')}
                </ul>`
									: ''

							return `<div class="code-group">\n${tabsHtml}`
						},
						closeRender: () => `</div>\n`,
					})
					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
					// type incompatibility with markdown-it and markdown-exit
					.use(snippet, {
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
					}),
		}),
		sveltekit(),
		devtoolsJson(),
	],
})
