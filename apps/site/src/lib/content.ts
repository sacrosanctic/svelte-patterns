import type { Component } from 'svelte'

import * as v from 'valibot'
import { defineErrors, extractErrorMessage, type InferErrors } from 'wellcrafted/error'
import { Ok, type Result } from 'wellcrafted/result'

export const categories = ['concept', 'faq', 'meta', 'general', 'resource', 'misc'] as const

export const categoryLabels: Record<Md['fm']['category'], string> = {
	concept: 'Concept',
	faq: 'FAQ',
	general: 'General',
	meta: 'Meta',
	misc: 'Misc',
	resource: 'Resource',
}
export const FrontmatterSchema = v.object({
	category: v.picklist(categories),
	title: v.string('Title is required'),
})

export type Md = {
	component: Component
	fm: v.InferOutput<typeof FrontmatterSchema>
	slug: string
	sourcePath: string
}

export type RawMd = {
	default: Component
	frontmatter: Record<string, unknown>
}

export const AppError = defineErrors({
	DocMissing: ({ path }: { path: string }) => ({
		message: 'This doc has not been created yet.',
		path,
	}),
	DocNotFound: ({ path }: { path: string }) => ({
		message: 'Page not found',
		path,
	}),
	Unexpected: ({ cause }: { cause: unknown }) => ({
		cause,
		message: `oops: ${extractErrorMessage(cause)}`,
	}),
})
export type AppError = InferErrors<typeof AppError>

const normalizeSlug = (name: string) =>
	name
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')

export const buildDocEntries = (
	modules: Record<string, RawMd>,
	schema = FrontmatterSchema,
): Md[] => {
	const entries: Md[] = []

	for (const [globPath, md] of Object.entries(modules)) {
		const parts = globPath.split('/')
		const filename = parts.pop()!.replace('.md', '')
		const name = filename === 'index' ? parts.pop()! : filename
		const slug = normalizeSlug(name)

		if (!slug) continue

		const result = v.safeParse(schema, md.frontmatter)

		if (!result.success) {
			const issues = result.issues.map((i) => i.message).join(', ')
			throw Error(`Invalid frontmatter in ${globPath}: ${issues}`)
		}

		entries.push({
			component: md.default,
			fm: result.output,
			slug,
			sourcePath: globPath,
		})
	}

	return entries.sort((a, b) => {
		const t = a.fm.title.localeCompare(b.fm.title, undefined, { sensitivity: 'base' })
		if (t !== 0) return t
		return a.slug.localeCompare(b.slug)
	})
}

const rawModules = import.meta.glob<RawMd>(`/src/content/sveltepatterns.dev/**/*.md`, {
	eager: true,
})

export const modules = buildDocEntries(rawModules)
const moduleBySlug = new Map<string, Md>(modules.map((d) => [d.slug, d]))

export const getDoc = (slug: string): Result<Md, AppError> => {
	try {
		const doc = moduleBySlug.get(slug)
		if (!doc) return AppError.DocNotFound({ path: slug })
		return Ok(doc)
	} catch (e) {
		return AppError.Unexpected({ cause: e })
	}
}
