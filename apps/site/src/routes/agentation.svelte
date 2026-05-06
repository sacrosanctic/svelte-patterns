<script lang="ts">
	import { browser, dev } from '$app/environment'

	import { Agentation } from 'sv-agentation'
</script>

{#if browser && dev}
	<Agentation workspaceRoot="__WORKSPACE_ROOT__" />
{/if}
