import type { Props as Sidebar } from '$lib/sidebar.svelte'

import { categoryLabels, modules } from '$lib/content'

export const load = () => {
	// todo:refactor
	const grouped = Object.groupBy(modules, (m) => m.fm.category)

	return {
		sidebar: {
			groups: [
				{ category: 'concept', items: grouped.concept ?? [], label: categoryLabels.concept },
				{ category: 'meta', items: grouped.meta ?? [], label: categoryLabels.meta },
				{ category: 'faq', items: grouped.faq ?? [], label: categoryLabels.faq },
			],
		} satisfies Sidebar,
	}
}
