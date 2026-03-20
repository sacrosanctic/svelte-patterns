/**
 * @param {import('mdast').Paragraph} input
 * @param {string} directiveName
 * @returns {{ name: string;  } & ({ type: 'import'; filepath: string; }|{  type:  'inline'; content?: string; language?: string;})[]}
 */
export function parseGroup(input, directiveName) {
	const files = []
	const firstChild = input.children.at(0)
	const lastChild = input.children.at(-1)
	if (
		firstChild &&
		firstChild.type === 'text' &&
		firstChild.value.startsWith(`:::${directiveName}\n`) &&
		lastChild &&
		lastChild.type === 'text' &&
		lastChild.value.startsWith('\n:::')
	) {
		// Iterate through children to find pairs of text (path) and linkReference (name)
		// or inline code blocks
		for (let i = 0; i < input.children.length; i++) {
			const node = input.children[i]
			// console.log(node)
			// console.log(i)

			// Look for imported files with <<< syntax
			if (node.type === 'text' && node.value.includes('<<<')) {
				// Extract path (e.g., ./how-to-sse/+page.svelte)
				const pathMatch = node.value.match(/<<<\s+(\S+)/)
				const filepath = pathMatch ? pathMatch[1] : null

				// The name is the label of the NEXT node (linkReference)
				const nextNode = input.children[i + 1]
				const name = nextNode?.type === 'linkReference' ? nextNode.label : null

				if (filepath && name) {
					files.push({ name, filepath, type: 'import' })
					// console.log('imported')
					i++
					continue
				} else {
					// should error
				}
			}
			// console.log('not imported')
			// JSON.stringify(node, null, 2)

			// Look for inline code blocks
			if (node.type === 'code' && node.lang && node.meta) {
				// Extract filename from meta (e.g., [filename])
				const filenameMatch = node.meta.match(/^\[(.+)\]$/)
				const name = filenameMatch ? filenameMatch[1] : node.lang
				const content = node.value || ''
				const language = node.lang

				if (content) {
					files.push({
						name,
						filepath: `[inline] ${name}`,
						type: 'inline',
						content,
						language,
					})
				}
			}
		}
	}
	return files
}
