import { visit } from 'unist-util-visit'
import { upsertScript } from './shared/upsert-script.js'

export function remarkCustomContainers() {
	/**
	 * Remark plugin to transform VitePress-style custom containers
	 * @param {import('mdast').Root} tree - The MDAST tree
	 * @returns {void}
	 */
	return (tree) => {
		const containerTypes = ['info', 'tip', 'warning', 'danger', 'details']
		const containerRegex = /:::\s*(\w+)(?:\s+(.+?))?\s*\n([\s\S]*?)\n:::/g

		visit(tree, 'text', (node, index, parent) => {
			if (!parent || index === undefined) return

			const text = node.value
			/** @type {import('mdast').RootContent[]} */
			const replacements = []
			let lastIndex = 0
			let match

			while ((match = containerRegex.exec(text)) !== null) {
				const [fullMatch, containerType, title, content] = match

				// Add text before the container
				const beforeText = text.slice(lastIndex, match.index)
				if (beforeText) {
					replacements.push({ type: 'text', value: beforeText })
				}

				// Validate container type
				if (!containerTypes.includes(containerType)) {
					continue
				}

				// Create HTML node that will be processed as Svelte component
				const titleAttr = title ? ` title="${escapeHtml(title.trim())}"` : ''
				const containerHtml = `<CustomContainer type="${containerType}"${titleAttr}>\n${content.trim()}\n</CustomContainer>`

				/** @type {import('mdast').Html} */
				const htmlNode = {
					type: 'html',
					value: containerHtml,
				}

				replacements.push(htmlNode)
				lastIndex = match.index + fullMatch.length
			}

			// Add remaining text after last container
			const remainingText = text.slice(lastIndex)
			if (remainingText) {
				replacements.push({ type: 'text', value: remainingText })
			}

			// Replace the original text node with our replacements
			if (replacements.length > 0) {
				parent.children.splice(index, 1, ...replacements)
			}
		})

		// Ensure the CustomContainer component is imported
		upsertScript(
			tree,
			'CustomContainer',
			'$lib/components/custom-containers/CustomContainer.svelte',
		)
	}
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
	/** @type {Record<string, string>} */
	const htmlEscapes = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
	}
	return text.replace(/[&<>"']/g, (char) => htmlEscapes[char])
}
