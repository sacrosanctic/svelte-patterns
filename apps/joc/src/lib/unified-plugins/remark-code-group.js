import { visit } from 'unist-util-visit'
import path from 'node:path'
import { parseGroup } from './shared/parse-group.js'
import { getFileContent } from './shared/read-repl-files.js'
import { getLanguage } from './shared/get-language.js'
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
export function remarkCodeGroup() {
	/**
	 * Remark plugin to transform code-group syntax into tabbed code blocks
	 * @param {import('mdast').Root} tree - The MDAST tree
	 * @param {CustomVFile} file - The virtual file object
	 * @returns {void}
	 */
	return (tree, file) => {
		visit(tree, 'paragraph', (node, index, parent) => {
			if (!parent || !index) return

			const textNode = node.children.at(0)
			if (textNode?.type !== 'text') return
			if (!textNode.value.startsWith(':::code-group')) return

			const markdownDir = path.dirname(file.filename)

			console.log(node)
			console.log(node.children)
			const files = parseGroup(node, 'code-group')
				.map(({ name, filepath, type, content, language }) => {
					if (type === 'inline') {
						// For inline code blocks, use the provided content and language
						return {
							name,
							filepath,
							content,
							language,
						}
					} else {
						// For imported files, read the content from filesystem
						const fileContent = getFileContent(filepath, markdownDir)
						if (fileContent === undefined) return null

						const extension = path.extname(filepath).slice(1)
						const fileLanguage = getLanguage(extension)

						return {
							name,
							filepath,
							content: fileContent,
							language: fileLanguage,
						}
					}
				})
				.filter((file) => file !== null)

			const paragraphNode = parent.children.at(index)
			if (paragraphNode?.type === 'paragraph') {
				paragraphNode.children = [
					{ type: 'html', value: `<CodeGroup files={${JSON.stringify(files)}} />` },
				]
			}

			upsertScript(tree, 'CodeGroup', '$lib/code-group.svelte')
		})
	}
}
