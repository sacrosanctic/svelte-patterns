<script>
	let { children } = $props()
</script>

<header>
	<nav>
		<a href="/">/root</a>
		<a href="/contact">/contact</a>
	</nav>
</header>

<main>
	{@render children()}
</main>
