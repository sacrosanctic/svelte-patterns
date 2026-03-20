import {
	defineConfig,
	presetTypography,
	presetWind4,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss'
import extractorSvelte from '@unocss/extractor-svelte'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'

export default defineConfig({
	extractors: [extractorSvelte()],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	// variants: [
	// 	(matcher) => {
	// 		const prefix = 'prose-inline-code:'
	// 		if (!matcher.startsWith(prefix)) return matcher

	// 		return {
	// 			// Slice the prefix to match the rest of the utility (e.g., 'bg-red-500')
	// 			matcher: matcher.slice(prefix.length),
	// 			// This function rewrites the selector
	// 			selector: (s) => `.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))${s}`,
	// 		}
	// 	},
	// ],
	presets: [
		presetWind4({ preflights: { reset: true } }),
		presetTypography(),
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
		}),
		// https://iconify.design/docs/usage/css/
		// unocss uses svg in css, best for default

		// https://iconify.design/docs/usage/svg/
		// https://github.com/unplugin/unplugin-icons
		// use svg in html when you can to edit it
		presetWebFonts({
			provider: 'fontsource',
			fonts: {
				mono: ['jetbrains-mono'],
				sans: ['atkinson-hyperlegible'],
				// serif:[],
			},
			processors: createLocalFontProcessor({
				// Directory to cache the fonts
				cacheDir: 'node_modules/.cache/unocss/fonts',

				// Directory to save the fonts assets
				fontAssetsDir: 'src/lib/assets/fonts',

				// Base URL to serve the fonts from the client
				fontServeBaseUrl: '/assets/fonts',
			}),
		}),
	],
	theme: {
		colors: {
			brand: 'light-dark(var(--colors-orange-400),var(--colors-orange-600))',
			'text-1': 'light-dark(gray-700, gray-300)',
			'text-2': 'light-dark(gray-600, gray-500)',
			'surface-1': 'light-dark(gray-50, zinc-950)',
			'surface-2': 'light-dark(gray-100, gray-950)',
			'surface-3': 'light-dark(gray-200, gray-900)',
			'surface-4': 'light-dark(gray-300, gray-800)',
			border: 'light-dark(gray-400, gray-800)',
		},
	},
	rules: [],
})
