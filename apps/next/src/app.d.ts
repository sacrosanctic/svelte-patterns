// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Sidebar } from '$lib/content'

declare global {
	namespace App {
		interface PageData {
			sidebar?: Sidebar
		}
	}
}

export {}
