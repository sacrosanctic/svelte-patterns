import { compile } from 'mdsvex'
import { enhanceImgRehypePlugin } from './src/lib/enhance.js'
import { updateAssetPathsPlugin } from './src/lib/update-paths.js'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { dirname, resolve } from 'path'

const sourcePath = './src/content/test1/boring.md'
const outputPath = './src/routes/test1/boring/+page.svelte'

async function compileMarkdownToRoute() {
	try {
		console.log('📖 Reading markdown file:', sourcePath)
		const markdownContent = await readFile(sourcePath, 'utf8')

		// Calculate paths for asset resolution
		const sourceDir = dirname(resolve(sourcePath))
		const targetDir = dirname(resolve(outputPath))

		console.log('🔧 Compiling with mdsvex and path resolution...')
		const result = await compile(markdownContent, {
			rehypePlugins: [[updateAssetPathsPlugin, sourceDir, targetDir], enhanceImgRehypePlugin],
		})

		// Create output directory if it doesn't exist
		await mkdir(dirname(outputPath), { recursive: true })

		console.log('💾 Writing compiled Svelte component to:', outputPath)
		await writeFile(outputPath, result.code, 'utf8')

		console.log('✅ Successfully created route component!')
		console.log('📍 Route available at: /test1/boring')
	} catch (error) {
		console.error('❌ Error:', error.message)
	}
}

compileMarkdownToRoute()
