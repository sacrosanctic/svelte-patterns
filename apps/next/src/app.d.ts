// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Sidebar } from '$lib/content'

import 'unplugin-icons/types/svelte'

declare global {
	namespace App {
		interface PageData {
			editUrl?: string
			sidebar?: Sidebar
		}
	}
}

export { }
