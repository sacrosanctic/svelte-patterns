<script lang="ts">
	import { resolve } from '$app/paths'
	import * as config from '$lib/config'
	import ModeSwitcher from './mode-switcher.svelte'
</script>

<nav class="py-7 md:flex md:justify-between">
	<a href={resolve('/')} class="title">
		<b>{config.title}</b>
	</a>

	<ul class="my-7 md:my-0 md:flex md:gap-7">
		<li>
			<a href={resolve('/about')} class="inherit no-underline">About</a>
		</li>
		<li>
			<a href={resolve('/contact')} class="inherit no-underline">Contact</a>
		</li>
		<li>
			<a href={resolve('/rss.xml')} target="_blank" class="inherit no-underline">RSS</a>
		</li>
	</ul>

	<ModeSwitcher />
</nav>
