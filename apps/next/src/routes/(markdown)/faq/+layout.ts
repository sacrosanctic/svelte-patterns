import { sectionLabels, type Sidebar } from '$lib/content'

import { listDocs } from './content'

export const load = async () => ({
	sidebar: {
		groups: [{ items: listDocs(), label: sectionLabels.faq, section: 'faq' }],
	} satisfies Sidebar,
})
