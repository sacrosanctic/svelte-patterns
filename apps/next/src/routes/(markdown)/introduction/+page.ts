import type { Sidebar } from '$lib/content'

import { listDocs as concept } from '../concept/content'
import { listDocs as docs } from '../docs/content'
import { listDocs as faq } from '../faq/content'

export const load = () => {
	return {
		sidebar: {
			docs: [...docs(), ...concept(), ...faq()],
		} satisfies Sidebar,
	}
}
