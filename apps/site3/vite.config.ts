import devtoolsJson from 'vite-plugin-devtools-json'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import svelteMd from 'vite-plugin-svelte-md'
import { snippet } from '@mdit/plugin-snippet'
import { container } from '@mdit/plugin-container'
import { join, resolve } from 'node:path'
import Shiki from '@shikijs/markdown-exit'

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

							for (const child of children.values()) {
								if (child.type !== 'fence') continue

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
						closeRender: () => `</div>\n`,
					})
					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
					// type incompatibility with markdown-it and markdown-exit
					.use(container, {
						name: 'svelte-repl',
						openRender: (tokens, index) => {
							const endIndex = tokens.findIndex(
								(token) => token.type === 'container_svelte-repl_close',
							)

							const children = tokens.slice(index + 1, endIndex)
							const items: { name: string; lang?: string; content: string; isImport: boolean }[] =
								[]
							console.log(children)

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
										items.push({ name, lang: ext, content: path, isImport: true })
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
										items.push({ name, lang: ext, content: path, isImport: true })
									}
								} else {
									// Code fence: ```lang [name] content
									const nameMatch = info.match(/^(.+?)\s+\[([^\]]+)\]$/)
									if (nameMatch) {
										const [, lang, name] = nameMatch
										// child.info = lang
										items.push({ name, lang, content: child.content, isImport: false })
									} else {
										const lang = info
										const name = `file${items.length + 1}` // double check what vitepress does with no name
										items.push({ name, lang, content: child.content, isImport: false })
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

							return `
<script>
	import { SvelteRepl } from '@repo/ui'
	${imports.join('\n	')}
</script>
<SvelteRepl files="{[${files.join(',')}]}" />
`
						},
						closeRender: () => '',
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
							themes: {
								light: 'vitesse-light',
								dark: 'vitesse-dark',
							},
						}),
					),
		}),
		sveltekit(),
		devtoolsJson(),
	],
})
