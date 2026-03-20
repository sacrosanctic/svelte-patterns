/**
 * @param {import('mdast').Root} tree
 * @param {string} componentName
 * @param {string} importPath
 * @returns {void}
 */
export function upsertScript(tree, componentName, importPath) {
	const htmlNodes = tree.children.filter((n) => n.type === 'html')
	const scriptNode = htmlNodes.find((node) => node.value.startsWith('<script'))

	const importStatement = `import ${componentName} from '${importPath}';`

	if (scriptNode) {
		const [before, ...after] = scriptNode.value.split('>')
		scriptNode.value = before + `>` + `\t${importStatement}\n` + after.join('>')
	} else {
		/** @type {import('mdast').Html} */
		const newScriptNode = {
			type: 'html',
			value: `<script>\n\t${importStatement}\n</script>`,
		}
		tree.children.unshift(newScriptNode)
	}
}
