import { dirname } from 'node:path'

import type { Component } from 'svelte'

import * as pkg from 'empathic/package'

const projectRoot = dirname(pkg.up({ cwd: import.meta.dirname })!)

const rawModules = import.meta.glob<{
	default: Component
	frontmatter: Record<string, unknown>
}>('/src/lib/content/**/*.md', {
	eager: true,
})

export const contentMap = Object.entries(rawModules).reduce(
	(acc, [globPath, md]) => {
		const fullPath = projectRoot + globPath
		const parts = globPath.split('/')
		const filename = parts.pop()!.replace('.md', '')
		const name = filename === 'index' ? parts.pop()! : filename
		const slug = name
			.toLowerCase() // lowercase
			.replace(/\s+/g, '-') // spaces → hyphens
			.replace(/[^a-z0-9-]/g, '') // strip non-alphanumeric chars (keep a-z, 0-9, -)
			.replace(/-+/g, '-') // collapse consecutive hyphens
			.replace(/^-|-$/g, '') // trim leading/trailing hyphens

		if (slug) {
			acc[slug] = {
				name,
				component: md.default,
				frontmatter: md.frontmatter,
				path: fullPath,
			}
		}

		return acc
	},
	{} as Record<
		string,
		{
			component: Component
			frontmatter: Record<string, unknown>
			name: string
			path: string
		}
	>,
)
