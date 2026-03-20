import { compile } from 'mdsvex'
import { mdsvexOptions } from '../mdsvex.config.js'
import fs from 'fs'

const main = async () => {
	const markdown = fs.readFileSync('../src/posts/sse.md', 'utf8')

	const result = await compile(markdown, { ...mdsvexOptions })
	if (!result) return
	fs.writeFileSync('./compiled-output.svelte', result.code)

	console.log('Compiled Svelte code saved to ./compiled-output.svelte')
}

main()
