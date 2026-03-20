import { mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-vercel'
import { mdsvexOptions } from './mdsvex.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [mdsvex(mdsvexOptions)],

	kit: { adapter: adapter() },
	extensions: ['.svelte', '.md'],
}

export default config
