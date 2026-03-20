import fs from 'node:fs'
import path from 'node:path'

/**
 * @param {string} currentPath
 * @returns {string}
 */
export function findProjectRoot(currentPath) {
	const hasPackageJson = fs.existsSync(path.join(currentPath, 'package.json'))
	if (hasPackageJson) return currentPath

	const parentPath = path.resolve(currentPath, '..')
	if (parentPath === currentPath) return currentPath

	return findProjectRoot(parentPath)
}
