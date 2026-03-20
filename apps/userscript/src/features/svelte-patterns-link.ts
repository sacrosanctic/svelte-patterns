export const description =
	'Adds a button next to external links on svelte.dev/docs pages to link to sveltepatterns.dev with the current URL shadowed'

export const run = () => {
	const PATTERN_SITE_URL = 'https://sveltepatterns.dev'

	const getShadowUrl = (url: string = location.href): string =>
		url.replace(location.origin, PATTERN_SITE_URL)

	function insertLink(): void {
		const existing = document.querySelector(`.desktop a[href*="${PATTERN_SITE_URL}"]`)
		if (existing) return

		const parent = document.querySelector('div.external-links')
		if (!parent) return

		const firstChild = parent.children[0]
		if (!firstChild) return

		const shadowLink = firstChild.cloneNode(true) as HTMLAnchorElement
		shadowLink.href = getShadowUrl()
		shadowLink.target = '_blank'
		shadowLink.style.cssText += `
			display: flex;
			align-items: center;
			color: var(--sk-fg-3);
			font-weight: bold;
			font-size: 23px;
			text-decoration: none;
			width: 26px;
		`
		const child = shadowLink.children[0] as HTMLElement
		child.innerHTML = 'SP'
		child.style.cssText += 'letter-spacing: -2px'
		child.removeAttribute('data-icon')

		parent.prepend(shadowLink)
	}

	function insertMobileLink(): void {
		const existing = document.querySelector(`.mobile a[href*="${PATTERN_SITE_URL}"]`)
		if (existing) return

		const parent = document.querySelector('div.mobile-menu')
		if (!parent) return

		const anchorEl = document.createElement('a')
		anchorEl.href = getShadowUrl()
		anchorEl.target = '_blank'
		anchorEl.className = 'raised'
		anchorEl.style.cssText = `
			width: 3.2rem;
			height: 3.2rem;
			display: grid;
			place-items: center;
			font-size: 18px;
			color: var(--sk-fg-3);
		`
		anchorEl.innerHTML = 'SP'
		parent.prepend(anchorEl)
	}

	function updateLink(url: string): void {
		const anchorEls = document.querySelectorAll(
			`a[href*="${PATTERN_SITE_URL}"]`,
		) as NodeListOf<HTMLAnchorElement>
		anchorEls.forEach((el) => (el.href = getShadowUrl(url)))
	}

	function onUrlUpdate(callback: (url: string) => void): void {
		if ((window as any).navigation) {
			;(window as any).navigation.addEventListener('navigate', (event: any) =>
				callback(event.destination.url),
			)
			return
		}

		window.addEventListener('hashchange', (e) => callback(e.newURL))

		const titleEl = document.querySelector('title')
		if (titleEl) {
			const observer = new MutationObserver(() => callback(location.href))
			observer.observe(titleEl, { childList: true, characterData: true, subtree: true })
		}
	}

	function updateMobileLink(url: string): void {
		let hasInjected = false
		const body = document.querySelector('body')
		if (!body) return

		const handleTocMutation = () => {
			const ulEl = document.querySelector('div.contents > ul:nth-of-type(2)')
			if (!ulEl || hasInjected) return

			const firstChild = ulEl.querySelector('li')
			if (!firstChild) return

			observer.disconnect()
			const shadowLinkContainer = firstChild.cloneNode(true) as HTMLElement
			const shadowLink = shadowLinkContainer.querySelector('a') as HTMLAnchorElement
			if (shadowLink) {
				shadowLink.href = getShadowUrl(url)
				shadowLink.innerHTML = 'Svelte Patterns'
			}
			ulEl.prepend(shadowLinkContainer)
			hasInjected = true
			observer.observe(body, { childList: true, subtree: true })
		}

		const observer = new MutationObserver(handleTocMutation)
		observer.observe(body, { childList: true, subtree: true })
	}

	let attempts = 0
	const interval = setInterval(() => {
		if (++attempts > 20) return clearInterval(interval)
		if (!(window as any).__svelte) return

		insertLink()
		insertMobileLink()
		onUrlUpdate(updateLink)
		clearInterval(interval)
		// onUrlUpdate(updateMobileLink)
	}, 500)
}
