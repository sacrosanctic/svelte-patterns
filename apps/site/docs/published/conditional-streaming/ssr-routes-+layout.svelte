<script>
	let { children } = $props()
</script>

<header>
	<nav>
		<a href="/">/home</a>
		<a href="/about">/about</a>
	</nav>
</header>

<main>
	{@render children()}
</main>
