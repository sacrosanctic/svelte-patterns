<script>
	// https://github.com/js-temporal/temporal-polyfill
	// https://github.com/fullcalendar/temporal-polyfill

	const loadScript = (url) => {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script')
			script.src = url
			script.onload = resolve
			script.onerror = reject
			document.head.appendChild(script)
		})
	}

	let { src, children } = $props()
</script>

{#await loadScript(src) then _}
	{@render children?.()}
{/await}
