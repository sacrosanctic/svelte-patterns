class SearchDialogState {
	isOpen = $state(false)

	close = () => {
		this.isOpen = false
	}

	open = () => {
		this.isOpen = true
	}

	toggle = () => {
		this.isOpen = !this.isOpen
	}
}

export const searchDialog = new SearchDialogState()
