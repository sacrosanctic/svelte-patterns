<script>
	import { tick } from 'svelte'

	const routes = [
		{ path: '/', label: 'Home' },
		{ path: '/about', label: 'About' },
	]

	let page = $state('/')

	const updateRoute = (e) => {
		const path = e.currentTarget.getAttribute('data-path')

		const updateDOM = async () => {
			// update the DOM
			page = path
			await tick()
		}

		if (document.startViewTransition) {
			document.startViewTransition(updateDOM)
		} else {
			updateDOM()
		}
	}
</script>

current path: {page}

<nav>
	<ul>
		{#each routes as route (route.path)}
			<li aria-current={page === route.path ? 'page' : undefined}>
				<button data-path={route.path} onclick={updateRoute}>{route.label}</button>
			</li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		height: 3em;
		display: flex;
		list-style: none;
	}

	li {
		position: relative;

		button {
			height: 100%;

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
