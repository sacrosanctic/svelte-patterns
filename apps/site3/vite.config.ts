import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svelteMd from 'vite-plugin-svelte-md';
import { snippet } from '@mdit/plugin-snippet';
import { join, resolve } from 'node:path';

const rootPath = resolve(__dirname);

export default defineConfig({
	plugins: [
		tailwindcss(),
		svelteMd({
			markdownItOptions: {},
			use: (md) =>
				// @ts-expect-error plugin doesnt support ts (probably)
				md.use(snippet, {
					currentPath: (env) => env.id,
					resolvePath: (filePath) => {
						if (filePath.startsWith('/')) {
							return join(rootPath, filePath.slice(1));
						}
						if (filePath.startsWith('$lib/')) {
							return join(rootPath, 'src/lib', filePath.slice(5));
						}
						return filePath;
					}
				})
		}),
		sveltekit(),
		devtoolsJson()
	]
});
