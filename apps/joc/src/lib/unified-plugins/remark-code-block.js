import { visit } from 'unist-util-visit'
import { dirname, extname } from 'node:path'
import { getFileContent } from './shared/read-repl-files.js'
import { getLanguage } from './shared/get-language.js'

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
export function remarkCodeBlock() {
	/**
	 * Remark plugin to transform relative image URLs to absolute paths
	 * @param {import('mdast').Root} tree - The MDAST tree
	 * @param {CustomVFile} file - The virtual file object
	 * @returns {void}
	 */
	return (tree, file) => {
		visit(tree, 'text', (node, index, parent) => {
			const text = node.value.trim()

			if (!text.startsWith('<<< ')) return
			if (parent?.type !== 'paragraph') return
			if (parent.children.length !== 1) return

			const match = text.match(/^<<<\s+(.+?)(?:\s+\[([^\]]+)\])?$/)
			if (!match) return

			const [, filePath, displayName] = match
			void displayName

			let content, language

			try {
				const markdownDir = dirname(file.filename)
				content = getFileContent(filePath, markdownDir) ?? ''
				const extension = extname(filePath).slice(1)
				language = getLanguage(extension)
			} catch (error) {
				// should throw
				console.error(error)
				content = `Error: File not found: ${filePath}`
				language = 'text'
			}

			// Create code node
			const codeNode = {
				/** @type {'code'} */
				type: 'code',
				lang: language,
				value: content,
			}

			// Replace the paragraph with the code node
			const paraIndex = tree.children.indexOf(parent)
			if (paraIndex !== -1) {
				tree.children[paraIndex] = codeNode
			}
		})
	}
}
