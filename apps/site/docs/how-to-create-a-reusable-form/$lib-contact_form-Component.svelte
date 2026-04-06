<script>
	import { enhance } from '$app/forms'
	import { page } from '$app/state'
</script>

<form method="POST" use:enhance action="?/submit">
	<input type="text" name="name" placeholder="Your Name" required />
	<button type="submit">Submit</button>
	<div>
		{page.form?.message}
	</div>
</form>
