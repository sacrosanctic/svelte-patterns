import { defineNavigation } from '@svecodocs/kit'
import { docs } from '$content/index.js'
import Notebook from 'phosphor-svelte/lib/Notebook'

type NavItem = { title: string; href: string }
type Category = (typeof docs)[number]['category']

const SECTION_ORDER = ['New']

function docToNavItem(doc: (typeof docs)[number]): NavItem {
	return {
		title: doc.title,
		href: `/${doc.slug}`,
	}
}

function buildSections() {
	const initialObject = {} as Record<Category, NavItem[]>

	const sections = docs.reduce((sections, doc) => {
		sections[doc.category] ??= []
		sections[doc.category].push(docToNavItem(doc))
		return sections
	}, initialObject)

	return Object.entries(sections) as [Category, NavItem[]][]
}

export const navigation = defineNavigation({
	anchors: [
		{
			title: 'Introduction',
			icon: Notebook,
			href: '/',
		},
	],
	sections: buildSections()
		.map(([title, items]) => ({ title, items }))
		.filter((item) => item.title !== 'Anchor')
		.filter((item) => item.items.length)
		.sort((a, b) => {
			const indexA = SECTION_ORDER.indexOf(a.title)
			const indexB = SECTION_ORDER.indexOf(b.title)

			// Handle titles not found in the custom order (optional, but recommended)
			// If a title isn't found (index is -1), place it at the end by assigning a high value.
			const finalIndexA = indexA === -1 ? Infinity : indexA
			const finalIndexB = indexB === -1 ? Infinity : indexB

			return finalIndexA - finalIndexB
		}),
})
