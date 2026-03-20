import fs from 'node:fs'
import path from 'node:path'

/**
 * @param {string} file
 * @param {string} baseDir
 */
export function getFileContent(file, baseDir) {
	const fullpath = path.resolve(baseDir, file)
	try {
		return fs.readFileSync(fullpath, 'utf8')
	} catch {
		// should throw error
		console.error(`file not found: ${fullpath}`)
		console.trace()
	}
}
