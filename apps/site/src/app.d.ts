// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Props as Sidebar } from '$lib/sidebar.svelte'
import type { MetaTagsProps } from 'svelte-meta-tags'

import 'unplugin-icons/types/svelte'

declare global {
	namespace App {
		interface PageData {
			sidebar?: Sidebar
			baseMetaTags?: MetaTagsProps
			pageMetaTags?: MetaTagsProps
		}
	}
}

export {}
