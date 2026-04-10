import { sectionLabels, type Sidebar } from '$lib/content'

import { listDocs as concept } from '../concept/content'
import { listDocs as docs } from '../docs/content'
import { listDocs as faq } from '../faq/content'

export const load = () => {
	return {
		sidebar: {
			groups: [
				{ items: docs(), label: sectionLabels.docs, section: 'docs' },
				{ items: concept(), label: sectionLabels.concept, section: 'concept' },
				{ items: faq(), label: sectionLabels.faq, section: 'faq' },
			],
		} satisfies Sidebar,
	}
}
