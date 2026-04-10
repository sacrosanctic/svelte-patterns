import { listDocs } from './content'

export const load = async () => ({
	sidebar: {
		docs: listDocs(),
	},
})