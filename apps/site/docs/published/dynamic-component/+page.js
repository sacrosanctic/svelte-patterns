export const load = async () => {
	const component = (await (Math.random() < 0.5 ? import('./A.svelte') : import('./B.svelte')))
		.default

	return {
		component,
		content: 'Hello world.',
	}
}
