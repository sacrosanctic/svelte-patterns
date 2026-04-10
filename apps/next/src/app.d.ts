// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { SidebarData } from '$lib/content'

declare global {
	namespace App {
		interface PageData {
			sidebar?: SidebarData
		}
	}
}

export {}
