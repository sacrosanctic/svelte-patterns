import type { Component } from 'svelte'

import { defineErrors, extractErrorMessage, type InferErrors } from 'wellcrafted/error'
import { Ok, type Result } from 'wellcrafted/result'

type Md = {
	name: string
	component: Component
	frontmatter: Record<string, unknown>
}

type RawMd = { default: Component; frontmatter: Record<string, unknown> }

const AppError = defineErrors({
	DocNotFound: ({ path }: { path: string }) => ({
		message: 'Failed to load MD.',
		path,
	}),
	Unexpected: ({ cause }: { cause: unknown }) => ({
		cause,
		message: `oops: ${extractErrorMessage(cause)}`,
	}),
})
type AppError = InferErrors<typeof AppError>

const rawModules = import.meta.glob<RawMd>(`/src/content/**/*.md`, { eager: true })
const modules = Object.entries(rawModules).reduce(
	(acc, [globPath, md]) => {
		// const fullPath = projectRoot + globPath
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
				// path: fullPath,
			}
		}

		return acc
	},
	{} as Record<string, Md>,
)

export const getDoc = (slug: string): Result<Md, AppError> => {
	try {
		const module = Object.entries(modules).find(([path]) => {
			const currentSlug = path.replace('/src/content/', '').replace('.md', '')
			const possiblematches = [`${slug}/index`, slug]
			return possiblematches.includes(currentSlug)
		})

		if (!module) return AppError.DocNotFound({ path: slug })

		const [, md] = module

		// const validate
		// if (docResult.metadata) {
		// 	error(404)
		// }

		return Ok(md)
	} catch (e) {
		return AppError.Unexpected({ cause: e })
	}
}
