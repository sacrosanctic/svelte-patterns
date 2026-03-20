import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import devtoolsJson from 'vite-plugin-devtools-json'
import { enhancedImages } from '@sveltejs/enhanced-img'

export default defineConfig({
	plugins: [
		//
		enhancedImages(),
		tailwindcss(),
		// UnoCSS(),
		sveltekit(),
		Icons({ compiler: 'svelte' }),
		devtoolsJson(),
	],
})
