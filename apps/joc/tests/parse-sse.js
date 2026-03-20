import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const main = async () => {
	try {
		// Use the ES build directly
		const svelteParseModule = await import('svelte-parse/dist/main.es.js')

		// Read the sse.md file
		const markdownPath = path.resolve(__dirname, 'compiled-output.svelte')
		const markdownContent = fs.readFileSync(markdownPath, 'utf8')

		console.log('🔄 Parsing sse.md with svelte-parse...')

		// Parse with svelte-parse
		const parseResult = svelteParseModule.parse({
			value: markdownContent,
			generatePositions: true,
		})
		const ast = parseResult

		// Save complete AST to file
		const outputPath = path.resolve(__dirname, './sse-ast.json')
		fs.writeFileSync(outputPath, JSON.stringify(ast, null, 2), 'utf8')

		const astSize = JSON.stringify(ast).length
		console.log(`✅ Complete AST saved to: ${outputPath}`)
		console.log(`📊 AST size: ${astSize.toLocaleString()} characters`)
		console.log(`📄 Total children: ${ast.children?.length || 0}`)
	} catch (error) {
		console.error('❌ Error during parsing:', error.message)
		process.exit(1)
	}
}

main()
