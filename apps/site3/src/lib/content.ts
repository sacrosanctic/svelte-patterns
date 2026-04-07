import type { Component } from 'svelte'

import { defineErrors, extractErrorMessage, type InferErrors } from 'wellcrafted/error'
import { Ok, type Result } from 'wellcrafted/result'

export type DocEntry = {
	component: Component
	frontmatter: Record<string, unknown>
	slug: string
	title: string
}

type RawMd = { default: Component; frontmatter: Record<string, unknown> & { title?: string } }

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
type AppError = InferErrors<typeof AppError>

const normalizeSlug = (name: string) =>
	name
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')

const titleFromSlug = (slug: string) =>
	slug
		.split('-')
		.filter(Boolean)
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ')

const rawModules = import.meta.glob<RawMd>(`/src/content/**/*.md`, { eager: true })

const buildDocEntries = (): DocEntry[] => {
	const entries: DocEntry[] = []

	for (const [globPath, md] of Object.entries(rawModules)) {
		const parts = globPath.split('/')
		const filename = parts.pop()!.replace('.md', '')
		const name = filename === 'index' ? parts.pop()! : filename
		const slug = normalizeSlug(name)

		if (!slug) continue

		const title =
			typeof md.frontmatter.title === 'string' && md.frontmatter.title.trim()
				? md.frontmatter.title.trim()
				: titleFromSlug(slug)

		entries.push({
			component: md.default,
			frontmatter: md.frontmatter,
			slug,
			title,
		})
	}

	return entries.sort((a, b) => {
		const t = a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
		if (t !== 0) return t
		return a.slug.localeCompare(b.slug)
	})
}

const sortedDocs = buildDocEntries()

const docsBySlug = new Map<string, DocEntry>(sortedDocs.map((d) => [d.slug, d]))

export const listDocs = (): DocEntry[] => [...sortedDocs]

export const getFirstDoc = (): DocEntry | undefined => sortedDocs[0]

export const getDoc = (slug: string): Result<DocEntry, AppError> => {
	try {
		const doc = docsBySlug.get(slug)
		if (!doc) return AppError.DocNotFound({ path: slug })
		return Ok(doc)
	} catch (e) {
		return AppError.Unexpected({ cause: e })
	}
}
