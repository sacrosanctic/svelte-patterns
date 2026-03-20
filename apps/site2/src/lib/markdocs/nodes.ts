// markdoc/nodes.ts
import type { Config } from 'markdoc-svelte'
import { Markdoc } from 'markdoc-svelte'
import path from 'node:path'

const nodes: Config['nodes'] = {
	image: {
		render: 'EnhancedImage',
		attributes: Markdoc.nodes.image.attributes,
		transform(node, config) {
			// Get the original src
			let src = node.attributes.src

			// Use base path if passed as variable
			const basePath = config.variables?.basePath || ''

			// Handle relative paths within content directory
			console.log(src)
			console.log(path.resolve(src))
			if (src.startsWith('./') || src.startsWith('../')) {
				// Convert ./boring.png to /src/lib/content/boring.png format
				src = `/src/lib/content/${src}`
			}
			console.log(src)

			// // Rewrite relative paths to absolute
			// if (src.startsWith('./') || src.startsWith('../')) {
			// 	src = path.posix.join(basePath, src)
			// }

			// Return a new node with modified src attribute
			return new Markdoc.Tag('EnhancedImage', {
				...node.attributes,
				src,
			})
		},
	},
}

export default nodes
