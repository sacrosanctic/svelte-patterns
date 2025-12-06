import fs from 'fs'
import path from 'path'

// --- Configuration ---
// Adjust this to the root folder where your content lives (e.g., 'pages' or 'content')
const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content')

function checkPathForConflict(filePath) {
	// 1. Check if the file name ends with '.md' or another relevant extension
	const ext = path.extname(filePath)
	if (ext !== '.md') {
		return // Ignore files that are not Markdown
	}

	// 2. Derive the potential directory conflict path
	// If filePath is '.../bob.md', this results in '.../bob'
	const baseName = path.basename(filePath, ext)
	const directoryPath = path.join(path.dirname(filePath), baseName)

	// 3. Check for the 'index' file inside the potential directory conflict
	// This results in '.../bob/index.md'
	const indexConflictPath = path.join(directoryPath, `index${ext}`)

	// 4. Check if the index file exists
	if (fs.existsSync(indexConflictPath)) {
		// Both are present—THROW ERROR
		const relativeFilePath = path.relative(process.cwd(), filePath)
		const relativeIndexConflictPath = path.relative(process.cwd(), indexConflictPath)

		throw new Error(`
🚨 Content Naming Conflict Detected! 🚨
You have a file and a folder trying to use the same URL path.
The two conflicting files are:
1. File at the root: **${relativeFilePath}**
2. Index file in sub-folder: **${relativeIndexConflictPath}**

ACTION REQUIRED: Please delete one of these files to resolve the conflict and continue.
`)
	}
}

// Function to recursively walk the file system
function walkDir(dir) {
	const files = fs.readdirSync(dir)

	for (const file of files) {
		const filePath = path.join(dir, file)
		const stat = fs.statSync(filePath)

		if (stat.isDirectory()) {
			// Don't check the content root itself, only go deeper
			if (dir !== CONTENT_ROOT) {
				walkDir(filePath)
			}
		} else {
			checkPathForConflict(filePath)
		}
	}
}

try {
	console.log(`\n🔍 Running custom content convention check against: ${CONTENT_ROOT}`)
	walkDir(CONTENT_ROOT)
	console.log('✅ Content convention check passed! No conflicts detected.')
} catch (error) {
	console.error(error.message)
	process.exit(1) // Exit with an error code to stop the build
}
