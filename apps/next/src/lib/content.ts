import type { Component } from 'svelte'

import { defineErrors, extractErrorMessage, type InferErrors } from 'wellcrafted/error'

export type DocEntry = {
	component: Component
	frontmatter: Record<string, unknown>
	section: 'concept' | 'docs' | 'faq'
	slug: string
	title: string
}

export type RawMd = {
	default: Component
	frontmatter: Record<string, unknown> & { title?: string }
}

export type Sidebar = {
	groups: SidebarGroup[]
}

export type SidebarGroup = {
	items: DocEntry[]
	label: string
	section: DocEntry['section']
}

export const sectionLabels: Record<DocEntry['section'], string> = {
	concept: 'Concepts',
	docs: 'Docs',
	faq: 'FAQ',
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

const titleFromSlug = (slug: string) =>
	slug
		.split('-')
		.filter(Boolean)
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ')

export const buildDocEntries = (
	modules: Record<string, RawMd>,
	section: 'concept' | 'docs' | 'faq',
): DocEntry[] => {
	const entries: DocEntry[] = []

	for (const [globPath, md] of Object.entries(modules)) {
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
			section,
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
