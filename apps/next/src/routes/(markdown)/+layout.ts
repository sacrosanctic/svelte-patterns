import type { Props as Sidebar } from '$lib/sidebar.svelte'

import { sectionLabels } from '$lib/content'

import { listDocs as concept } from './concept/content'
import { listDocs as docs } from './docs/content'
import { listDocs as faq } from './faq/content'

const buildSidebar = (): Sidebar => ({
	groups: [
		{ items: docs(), label: sectionLabels.docs, section: 'docs' },
		{ items: concept(), label: sectionLabels.concept, section: 'concept' },
		{ items: faq(), label: sectionLabels.faq, section: 'faq' },
	],
})

export const load = () => ({
	sidebar: buildSidebar(),
})
