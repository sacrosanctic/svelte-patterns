const fs = require('fs').promises
const path = require('path')

const readFolder = async (dir) => {
	const result = {}
	const entries = await fs.readdir(dir, { withFileTypes: true })

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name)

		if (entry.isDirectory()) {
			result[entry.name] = { directory: await readFolder(fullPath) }
		} else {
			const contents = await fs.readFile(fullPath, 'utf8')
			result[entry.name] = { file: { contents } }
		}
	}

	return result
}

const main = async () => {
	const folderPath = process.argv[2] // Pass folder path as an argument
	const outputPath = process.argv[3] || 'output.json'

	if (!folderPath) {
		console.error('Please provide a folder path')
		process.exit(1)
	}

	try {
		const folderStructure = await readFolder(folderPath)
		await fs.writeFile(outputPath, JSON.stringify(folderStructure, null, 2))
		console.log(`Output saved to ${outputPath}`)
	} catch (error) {
		console.error('Error reading folder:', error)
	}
}

main()
