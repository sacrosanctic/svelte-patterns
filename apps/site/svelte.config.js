import adapternode from '@sveltejs/adapter-node'
import adapterVercel from '@sveltejs/adapter-vercel'

const isDev = process.env.VERCEL_ENV !== 'preview' || process.env.VERCEL_ENV !== 'production'
const adapter = isDev ? adapternode : adapterVercel

const workspacePreprocessor = {
	markup: ({ content }) => {
		const root = process.cwd()
		const result = content.replace('__WORKSPACE_ROOT__', root)
		return { code: result }
	},
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),
		prerender: {
			handleMissingId: (details) => {
				if (details.id === 'main-content') return
			},
		},
	},
	preprocess: [workspacePreprocessor],
}

export default config
