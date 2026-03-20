import path from 'node:path'
import { visit } from 'unist-util-visit'
import { findUpSync } from 'find-up'

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
export function remarkImageTransform() {
	/**
	 * Remark plugin to transform code-group syntax into tabbed code blocks
	 * @param {import('mdast').Root} tree - The MDAST tree
	 * @param {CustomVFile} file - The virtual file object
	 *
	 * @returns {void}
	 */
	return (tree, file) => {
		const packageJsonPath = findUpSync('package.json', { cwd: file.filename })
		if (!packageJsonPath) {
			throw new Error('Could not find package.json in parent directories')
		}
		const rootPath = path.dirname(packageJsonPath)

		visit(tree, 'image', (node) => {
			const { url: imageCPath } = node

			if (imageCPath === '' || !imageCPath.startsWith('.')) return

			const markdownAPath = file.filename
			const imageAPath = path.resolve(path.dirname(markdownAPath), imageCPath)
			const imageBPath = path.posix.join('/', path.relative(rootPath, imageAPath))

			node.url = imageBPath.replace(/\\/g, '/')
		})
	}
}
