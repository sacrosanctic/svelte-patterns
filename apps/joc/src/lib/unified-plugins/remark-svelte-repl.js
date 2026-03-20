import { visit } from 'unist-util-visit'
import path from 'node:path'
import { parseGroup } from './shared/parse-group.js'
import { getFileContent } from './shared/read-repl-files.js'
import { upsertScript } from './shared/upsert-script.js'

/**
 * @typedef {Object} CustomVFile
 * @property {Object} data
 * @property {Object} data.fm
 * @property {string} data.fm.title
 * @property {string} data.fm.description
 * @property {string} data.fm.date
 * @property {string[]} data.fm.categories
 * @property {boolean} data.fm.published
 * @property {string[]} messages
 * @property {string[]} history
 * @property {string} cwd
 * @property {string} contents
 * @property {string} filename
 */
export function remarkSvelteRepl() {
	/**
	 * Remark plugin to transform relative image URLs to absolute paths
	 * @param {import('mdast').Root} tree - The MDAST tree
	 * @param {CustomVFile} file - The virtual file object
	 * @returns {void}
	 */
	return (tree, file) => {
		visit(tree, 'paragraph', (node, index, parent) => {
			if (!parent || !index) return

			const textNode = node.children.at(0)
			if (textNode?.type !== 'text') return
			if (!textNode.value.startsWith(':::svelte-repl')) return
			const markdownDir = path.dirname(file.filename)

			const files = parseGroup(node, 'svelte-repl')
				.map(({ name, filepath }) => ({
					name,
					contents: getFileContent(filepath, markdownDir),
				}))
				.filter((file) => file.contents !== undefined)

			const paragraphNode = parent.children.at(index)
			if (paragraphNode?.type === 'paragraph') {
				paragraphNode.children = [
					{ type: 'html', value: `<SvelteRepl files={${JSON.stringify(files)}} />` },
				]
			}

			upsertScript(tree, 'SvelteRepl', '@repo/ui')
		})
	}
}
