import { listDocs } from './content'

export const load = async () => ({
	sidebar: {
		currentSlug: '',
		docs: listDocs(),
		section: 'docs' as const,
	},
})
