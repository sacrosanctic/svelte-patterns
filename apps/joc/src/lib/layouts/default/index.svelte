<script lang="ts" module>
	import { img } from './custom/index.js'

	export { img }
</script>

<script lang="ts">
	let props = $props()
</script>

{@render props.children?.()}
