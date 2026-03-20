import { visit } from 'unist-util-visit'
import { relative } from 'path'

/**
 * Rehype plugin to update asset paths when compiling markdown to different locations
 * Updates src attributes for img elements to be relative to the new location
 */
export function updateAssetPathsPlugin(sourceContentDir, targetRouteDir) {
	return (/** @type {import("hast").Nodes} */ tree) => {
		console.log('🔧 updateAssetPathsPlugin: Processing asset paths')
		console.log(`📂 Source: ${sourceContentDir}`)
		console.log(`📍 Target: ${targetRouteDir}`)
		
		let updatedCount = 0
		
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName === 'img' && node.properties?.src) {
				const src = node.properties.src
				
				// Only update relative paths (not absolute URLs or data URLs)
				if (src.startsWith('./') || src.startsWith('../') || (!src.includes('://') && !src.startsWith('data:'))) {
					// Build full paths for calculation
					const assetFullPath = sourceContentDir + '/' + src
					const targetBasePath = targetRouteDir + '/'
					
					// Calculate new relative path from target to asset
					const newPath = relative(targetBasePath, assetFullPath)
					
					console.log(`🔄 Updating: ${src} → ${newPath}`)
					node.properties.src = newPath
					updatedCount++
				}
			}
		})
		
		console.log(`✅ updateAssetPathsPlugin: Updated ${updatedCount} asset paths`)
	}
}