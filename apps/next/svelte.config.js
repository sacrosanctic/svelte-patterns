import adapternode from '@sveltejs/adapter-node'
import adapterVercel from '@sveltejs/adapter-vercel'

const isDev = process.env.NODE_ENV === 'development'
const adapter = isDev ? adapternode : adapterVercel

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: { adapter: adapter() },
}

export default config
