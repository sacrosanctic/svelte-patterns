<script>
	import { page } from '$app/state'
	import { onNavigate } from '$app/navigation'

	let { children } = $props()

	const routes = [
		{ path: '/', label: 'Home' },
		{ path: '/about', label: 'About' },
	]

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<nav>
	<ul>
		{#each routes as route (route.path)}
			<li aria-current={page.url.pathname === route.path ? 'page' : undefined}>
				<a href={route.path}>{route.label}</a>
			</li>
		{/each}
	</ul>
</nav>

{@render children?.()}

<style>
	ul {
		height: 3em;
		display: flex;
		list-style: none;
	}

	li {
		position: relative;

		a {
			height: 100%;
			display: block;
			background-color: gray;

			&:hover {
				background-color: lightblue;
			}
		}
	}

	li[aria-current='page']::before {
		content: '';
		background-color: yellow;
		width: 100%;
		height: 5px;
		position: absolute;
		top: 0;
		left: 0;
		view-transition-name: active-page;
	}

	/* disable the default fade animation */
	::view-transition-group(root) {
		animation: none;
	}
</style>
