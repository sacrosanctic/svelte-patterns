// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Props as Sidebar } from '$lib/sidebar.svelte'

import 'unplugin-icons/types/svelte'

declare global {
	namespace App {
		interface PageData {
			editUrl?: string
			sidebar?: Sidebar
		}
	}
}

export {}
