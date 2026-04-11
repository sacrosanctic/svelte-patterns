class Sidebar {
	current = $state(false)

	toggle() {
		this.current = !this.current
	}
}

export const sidebar = new Sidebar()
