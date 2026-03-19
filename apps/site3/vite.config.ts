import { join, resolve } from 'node:path'

import { container } from '@mdit/plugin-container'
import { snippet } from '@mdit/plugin-snippet'
import Shiki from '@shikijs/markdown-exit'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import devtoolsJson from 'vite-plugin-devtools-json'
import svelteMd from 'vite-plugin-svelte-md'

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
						closeRender: () => `</div>\n`,
						openRender: (tokens, index) => {
							const endIndex = tokens.findIndex(
								(token) => token.type === 'container_code-group_close',
							)

							const children = tokens.slice(index + 1, endIndex)
							const tabNames: string[] = []

							for (const child of children.values()) {
								if (child.type !== 'fence') continue

								const src = child.meta?.src || ''
								const match = src.match(/^(.+?)\s+\[([^\]]+)\]$/)

								if (match) {
									const [, path, name] = match
									child.meta.src = path // Clean path for snippet plugin
									const ext = name.split('.').pop() ?? ''
									child.info = ext // Fix incorrect info from container plugin
									tabNames.push(name)
								} else {
									// Default: use filename as tab name
									tabNames.push(src.split('/').pop())
								}
							}

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
					})
					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
					// type incompatibility with markdown-it and markdown-exit
					.use(container, {
						name: 'svelte-repl',
						closeRender: () => '</div></div>',
						openRender: (tokens, index) => {
							const endIndex = tokens.findIndex(
								(token) => token.type === 'container_svelte-repl_close',
							)

							const children = tokens.slice(index + 1, endIndex)
							const items: {
								content: string
								isImport: boolean
								lang?: string
								name: string
							}[] = []

							for (const child of children) {
								if (child.type !== 'fence') continue

								const src = child.meta?.src as string
								const info = child.info

								if (src) {
									// Code Snippt: <<<path [name]
									const parts = src.split(' ')
									const lastPart = parts.pop()

									if (lastPart?.startsWith('[') && lastPart.endsWith(']')) {
										const name = lastPart.slice(1, -1)
										const path = parts.join(' ')
										child.meta.src = path // rename the name for snippet plugin parsing
										const ext = name.split('.').pop() ?? ''
										child.info = ext // Fix incorrect info from container plugin
										items.push({ name, content: path, isImport: true, lang: ext })
									} else {
										if (parts.length > 0) {
											throw new Error(
												`Invalid snippet syntax: "${src}". Expected "path" or "path [name]"`,
											)
										}
										const path = src
										const name = path.split('/').pop()!
										const ext = path.split('.').pop() ?? ''
										child.info = ext
										items.push({ name, content: path, isImport: true, lang: ext })
									}
								} else {
									// Code fence: ```lang [name] content
									const nameMatch = info.match(/^(.+?)\s+\[([^\]]+)\]$/)
									if (nameMatch) {
										const [, lang, name] = nameMatch
										// child.info = lang
										items.push({ name, content: child.content, isImport: false, lang })
									} else {
										const lang = info
										const name = `file${items.length + 1}` // double check what vitepress does with no name
										items.push({ name, content: child.content, isImport: false, lang })
									}
								}
							}

							// Generate imports
							const imports: string[] = []
							const files: string[] = []
							let importCounter = 0

							for (const item of items) {
								if (item.isImport) {
									const importName = `import_${importCounter++}`
									imports.push(`import ${importName} from '${item.content}?raw'`)
									files.push(`{contents: ${importName},name:'${item.name}',lang:'${item.lang}'}`)
								} else {
									files.push(
										`{contents: ${JSON.stringify(item.content)},name:'${item.name}',lang:'${item.lang}'}`,
									)
								}
							}

							const tabNames = items.map((item) => item.name)

							return `
<script>
	import { SvelteRepl } from '@repo/ui'
	import Tabs from '$lib/tabs.svelte'
	${imports.join('\n	')}
</script>
<div class="code-group">
	<div class="flex items-center px-2">
		<Tabs class="flex overflow-x-auto p-px" data="{${JSON.stringify(tabNames)}}" />
		<div class="mx-auto w-0"></div>
		<SvelteRepl class="capitalize" files="{[${files.join(',')}]}" />
	</div>
	<div>
`
						},
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
					})
					.use(
						Shiki({
							defaultColor: 'light-dark()',
							themes: {
								dark: 'dark-plus',
								light: 'light-plus',
							},
						}),
					),
			wrapperClasses: 'contents',
		}),
		sveltekit(),
		devtoolsJson(),
	],
})
