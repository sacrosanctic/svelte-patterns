```ts
// routes/docs/[...slug]/+page.server.ts
import { error } from '@sveltejs/kit';

export async function load({ url, fetch }) {
	const svelteUrl = `https://svelte.dev${url.pathname}`;
	try {
		const svelteResponse = await fetch(svelteUrl);
		if (svelteResponse.ok) {
			throw error(404, {
				status: 404,
				message: JSON.stringify({
					type: 'shadowable',
					svelteUrl,
					message: 'This page exists on Svelte docs—consider contributing!'
				})
			});
		} else {
			throw error(404, {
				status: 404,
				message: JSON.stringify({
					type: 'not_found',
					message: 'Page not found.'
				})
			});
		}
	} catch (err) {
		throw error(404, {
			status: 404,
			message: JSON.stringify({
				type: 'not_found',
				message: 'Page not found.'
			})
		});
	}
}
```