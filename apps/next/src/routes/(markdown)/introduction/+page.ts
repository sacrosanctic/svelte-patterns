import type { Sidebar } from '$lib/content'

import { listDocs as concept } from '../concept/content'
import { listDocs as docs } from '../docs/content'

export const load = () => {
	return {
		sidebar: {
			docs: [...docs(), ...concept()],
		} satisfies Sidebar,
	}
}
