let sidebarOpen = $state(false)

export const nav = {
	get sidebarOpen() {
		return sidebarOpen
	},
	set sidebarOpen(v: boolean) {
		sidebarOpen = v
	},
	toggleSidebar: () => {
		sidebarOpen = !sidebarOpen
	},
}
