<script>
	import Polyfill from './Polyfill.svelte'
</script>

<Polyfill src="https://cdn.jsdelivr.net/npm/temporal-polyfill@0.3.1/global.min.js">
	{Temporal.Now.zonedDateTimeISO().toString()}
</Polyfill>
