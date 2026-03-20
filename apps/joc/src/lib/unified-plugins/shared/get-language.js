/** @type {Record<string, string>} */
const languageMap = {
	js: 'javascript',
	ts: 'typescript',
	jsx: 'jsx',
	tsx: 'tsx',
	svelte: 'svelte',
	css: 'css',
	scss: 'scss',
	sass: 'sass',
	html: 'html',
	json: 'json',
	md: 'markdown',
	vue: 'vue',
	py: 'python',
	rs: 'rust',
	go: 'go',
	java: 'java',
	php: 'php',
	rb: 'ruby',
	sql: 'sql',
	yaml: 'yaml',
	yml: 'yaml',
	xml: 'xml',
	sh: 'bash',
	zsh: 'zsh',
	fish: 'fish',
}

/**
 * @param {string} extension
 * @returns {string}
 */
export function getLanguage(extension) {
	if (!extension) return 'text'
	const lang = languageMap[extension.toLowerCase()]
	return lang ?? ''
}