import type { Plugin } from 'vite'

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { cwd } from 'node:process'

const rootPath = resolve(cwd())

export const debugSvelteMdPlugin = (): Plugin => ({
	name: 'debug-svelte-md',
	transform(code, id) {
		if (!id.endsWith('.md') || id.includes('node_modules')) return

		const outputDir = join(rootPath, '.svelte-kit', 'svelte-md-output')
		if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true })

		const relativeOutPath = id
			.replace(rootPath, '')
			.replace(/^\/src\//, '/')
			.replace(/\.md$/, '.svelte')
			.replace(/^\//, '')

		const fullOutPath = join(outputDir, relativeOutPath)
		const outDir = dirname(fullOutPath)

		if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
		writeFileSync(fullOutPath, code)
	},
})
