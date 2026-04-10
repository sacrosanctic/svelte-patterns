import { join, resolve } from 'node:path'

import { markdownImgToEnhancedPlugin } from './plugins/vite/markdown-img-to-enhanced'
import { svelteMdA11YIgnorePlugin } from './plugins/vite/svelte-md-a11y-ignore'

import { container, type MarkdownItContainerOptions } from '@mdit/plugin-container'
import { snippet } from '@mdit/plugin-snippet'
import Shiki from '@shikijs/markdown-exit'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import markdownItAnchor from 'markdown-it-anchor'
import { defineConfig } from 'vite'
import devtoolsJson from 'vite-plugin-devtools-json'
import svelteMd from 'vite-plugin-svelte-md'

const rootPath = resolve(__dirname)

const REPL = ['SveltelabRepl', 'SvelteRepl', 'code_group'] as const
type REPL = (typeof REPL)[number]

type ReplEntry = {
	codeGroup?: boolean
	SveltelabRepl?: string[]
	SvelteRepl?: string[]
}

const replData = new Map<string, ReplEntry>()

let importCounter = 0

const createReplTemplate: (name: string, componentName: REPL) => MarkdownItContainerOptions = (
	name,
	componentName,
) => ({
	name,
	closeRender: () => '</div></div>',
	openRender: (tokens, index, _, env: { id: string }) => {
		const endIndex = tokens.findIndex(
			(token, i) => i > index && token.type === `container_${name}_close`,
		)

		const children = tokens.slice(index + 1, endIndex)
		const items: {
			name: string
			content: string
			isImport: boolean
			lang?: string
		}[] = []

		for (const child of children) {
			if (child.type !== 'fence') continue

			const src = child.meta?.src as string
			const info = child.info

			if (src) {
				const parts = src.split(' ')
				const lastPart = parts.pop()

				if (lastPart?.startsWith('[') && lastPart.endsWith(']')) {
					const name = lastPart.slice(1, -1)
					const path = parts.join(' ')
					child.meta.src = path
					const ext = name.split('.').pop()!
					child.info = ext
					items.push({ name, content: path, isImport: true, lang: ext })
				} else {
					if (parts.length > 0) {
						throw new Error(`Invalid snippet syntax: "${src}". Expected "path" or "path [name]"`)
					}
					const path = src
					const name = path.split('/').pop()!
					const ext = path.split('.').pop()!
					child.info = ext
					items.push({ name, content: path, isImport: true, lang: ext })
				}
			} else {
				const nameMatch = info.match(/^(.+?)\s+\[([^\]]+)\]$/)
				if (nameMatch) {
					const lang = nameMatch[1] ?? ''
					const name = nameMatch[2] ?? ''
					items.push({ name, content: child.content, isImport: false, lang })
				} else {
					const lang = info
					const name = `file${items.length + 1}`
					items.push({ name, content: child.content, isImport: false, lang })
				}
			}
		}

		const imports: string[] = []
		const files: string[] = []

		for (const item of items) {
			if (item.isImport) {
				const importName = `import_${importCounter++}`
				imports.push(`import ${importName} from '${item.content}?raw'`)
				files.push(`{contents: ${importName},name:'${item.name}'}`)
			} else {
				files.push(`{contents: ${JSON.stringify(item.content)},name:'${item.name}'}`)
			}
		}

		const mdPath = env.id
		let entry = replData.get(mdPath)
		if (!entry) {
			entry = {}
			replData.set(mdPath, entry)
		}

		if (componentName === 'code_group') {
			entry.codeGroup = true
		} else {
			const existingImports = entry[componentName] ?? []
			entry[componentName] = [...existingImports, ...imports]
		}

		const tabNames = items.map((item) => item.name)

		const componentHtml =
			componentName !== 'code_group'
				? `<${componentName} class="capitalize" files="{[${files.join(',')}]}" />`
				: ''

		return `
<!-- REPL_SCRIPT_PLACEHOLDER -->
<div class="code-group">
	<div class="flex items-center px-2">
		<Tabs class="flex overflow-x-auto p-px" data="{${JSON.stringify(tabNames)}}" />
		<div class="mx-auto w-0"></div>
		${componentHtml}
	</div>
	<div>
`
	},
})

export default defineConfig({
	plugins: [
		{
			name: 'reset-repl-state',
			buildStart() {
				importCounter = 0
				replData.clear()
			},
		},
		tailwindcss(),
		svelteMd({
			markdownItOptions: {},
			use: (md) =>
				md
					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
					// type incompatibility with markdown-it and markdown-exit
					.use(container, createReplTemplate('code-group', 'code_group'))

					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues 30
					// type incompatibility with markdown-it and markdown-exit
					.use(container, createReplTemplate('svelte-repl', 'SvelteRepl'))

					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues 30
					// type incompatibility with markdown-it and markdown-exit

					.use(container, createReplTemplate('sveltelab-repl', 'SveltelabRepl'))

					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
					// type incompatibility with markdown-it and markdown-exit
					.use(snippet, {
						currentPath: (env) => env.id,
						resolvePath: (filePath) => {
							const newPath = filePath

							const PROJECT_ROOT = '/'
							if (newPath.startsWith(PROJECT_ROOT)) {
								return join(rootPath, newPath.slice(PROJECT_ROOT.length))
							}
							const LIB_ALIAS = '$lib/'
							if (newPath.startsWith(LIB_ALIAS)) {
								return join(rootPath, 'src/lib', newPath.slice(LIB_ALIAS.length))
							}
							return newPath
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
					)

					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
					// type incompatibility with markdown-it and markdown-exit
					.use(markdownItAnchor, {
						permalink: markdownItAnchor.permalink.linkInsideHeader({
							class: 'header-anchor',
							placement: 'before',
							symbol: '#',
						}),
					})

					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
					// type incompatibility with markdown-it and markdown-exit
					.use(container, {
						name: 'info',
						closeRender: () => '</div>\n',
						openRender: (tokens, index) => {
							const title = tokens[index]?.info?.trim().replace(/^info\s*/, '')
							return `<div class="callout callout-info">${title ? `<p class="callout-title">${title}</p>` : ''}\n`
						},
					})

					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
					// type incompatibility with markdown-it and markdown-exit
					.use(container, {
						name: 'tip',
						closeRender: () => '</div>\n',
						openRender: (tokens, index) => {
							const title = tokens[index]?.info?.trim().replace(/^tip\s*/, '')
							return `<div class="callout callout-tip">${title ? `<p class="callout-title">${title}</p>` : ''}\n`
						},
					})

					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
					// type incompatibility with markdown-it and markdown-exit
					.use(container, {
						name: 'warning',
						closeRender: () => '</div>\n',
						openRender: (tokens, index) => {
							const title = tokens[index]?.info?.trim().replace(/^warning\s*/, '')
							return `<div class="callout callout-warning">${title ? `<p class="callout-title">${title}</p>` : ''}\n`
						},
					})

					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
					// type incompatibility with markdown-it and markdown-exit
					.use(container, {
						name: 'danger',
						closeRender: () => '</div>\n',
						openRender: (tokens, index) => {
							const title = tokens[index]?.info?.trim().replace(/^danger\s*/, '')
							return `<div class="callout callout-danger">${title ? `<p class="callout-title">${title}</p>` : ''}\n`
						},
					})

					// @ts-expect-error https://github.com/serkodev/markdown-exit/issues/30
					// type incompatibility with markdown-it and markdown-exit
					.use(container, {
						name: 'details',
						closeRender: () => '</details>\n',
						openRender: (tokens, index) => {
							const title = tokens[index]?.info?.trim().replace(/^details\s*/, '')
							return `<details class="callout-details">${title ? `<summary class="callout-title">${title}</summary>` : ''}\n`
						},
					}),
			wrapperClasses: 'contents',
		}),
		svelteMdA11YIgnorePlugin(),

		{
			name: 'repl-script-injector',
			transform(code, id) {
				if (id.includes('node_modules')) return
				if (!id.endsWith('.md')) return

				const mdPath = id

				const entry = replData.get(mdPath)
				if (!entry) return

				const svelteReplImports = entry.SvelteRepl ?? []
				const sveltelabReplImports = entry.SveltelabRepl ?? []
				const hasCodeGroup = entry.codeGroup ?? false

				if (!svelteReplImports.length && !sveltelabReplImports.length && !hasCodeGroup) return

				const baseImports: string[] = ["import Tabs from '$lib/tabs.svelte'"]

				if (svelteReplImports.length > 0) {
					baseImports.push("import { SvelteRepl } from '@repo/ui'")
				}
				if (sveltelabReplImports.length > 0) {
					baseImports.push("import { SveltelabRepl } from '@repo/ui'")
				}

				const allImports = [...baseImports, ...svelteReplImports, ...sveltelabReplImports]

				const script = `<script lang="ts">\n${allImports.join('\n\t')}\n</script>`

				// Insert after first </script> tag (after <script context="module">)
				const firstScriptEnd = code.indexOf('</script>')
				let newCode: string

				if (firstScriptEnd !== -1) {
					const insertPos = firstScriptEnd + '</script>'.length
					newCode = code.slice(0, insertPos) + '\n' + script + code.slice(insertPos)
				} else {
					// Fallback: use placeholder replacement
					newCode = code.replace('<!-- REPL_SCRIPT_PLACEHOLDER -->', script)
				}

				replData.delete(mdPath)

				return newCode
			},
		},

		markdownImgToEnhancedPlugin(),
		// debugSvelteMdPlugin(),
		enhancedImages(),
		sveltekit(),
		devtoolsJson(),
	],
})
