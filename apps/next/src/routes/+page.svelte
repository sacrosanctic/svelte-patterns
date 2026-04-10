<script lang="ts">
	import { resolve } from '$app/paths'
</script>

<p class="text-2xl text-foreground">front page</p>

<a
	href={resolve('/introduction')}
	class="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-all hover:text-primary-hover hover:decoration-primary"
>
	look inside
</a>
