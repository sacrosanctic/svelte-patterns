<script lang="ts">
	import { SvelteRepl, SveltelabRepl } from '@repo/ui';
	import appFile from './App.svelte?raw';
	import counterFile from './Counter.svelte?raw';
	import Test from './test.md';
	import { resolve } from '$app/paths';

	const svelteFiles = [
		{ name: 'App.svelte', contents: appFile },
		{ name: 'Counter.svelte', contents: counterFile }
	];

	const sveltelabFiles = [
		{ name: 'src/routes/+page.svelte', contents: appFile },
		{ name: 'src/routes/Counter.svelte', contents: counterFile }
	];
</script>

<h1>REPL Demos</h1>

<h2>Svelte.dev Playground</h2>
<SvelteRepl name="test" files={svelteFiles} />

<h2>Sveltelab Playground</h2>
<SveltelabRepl files={sveltelabFiles} />

<Test />

<a href={resolve('/foo')}>foo</a>
