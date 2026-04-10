import { sectionLabels, type Sidebar } from '$lib/content'

import { listDocs } from './content'

export const load = async () => ({
	sidebar: {
		groups: [{ items: listDocs(), label: sectionLabels.concept, section: 'concept' }],
	} satisfies Sidebar,
})
