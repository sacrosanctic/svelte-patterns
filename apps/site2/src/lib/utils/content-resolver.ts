import type { MarkdocModule } from 'markdoc-svelte'

// Pre-scan all content files
const contentFiles = import.meta.glob('$lib/content/**/*.md', { eager: true }) as Record<
	string,
	MarkdocModule
>

/**
 * Find content file by slug with fallback to index.md
 * @param slug - The slug from URL path
 * @returns MarkdocModule or null if not found
 */
export function findContentFile(slug: string): MarkdocModule | null {
	// Normalize slug path
	const normalizedSlug = slug.replace(/\/+/g, '/').replace(/^\//, '').replace(/\/$/, '')

	// Try direct file match: content-file.md
	const directPath = `/src/lib/content/${normalizedSlug}.md`
	if (contentFiles[directPath]) {
		console.log(`✅ Found direct file: ${directPath}`)
		return contentFiles[directPath]
	}

	// Try index file match: content-file/index.md
	const indexPath = `/src/lib/content/${normalizedSlug}/index.md`
	if (contentFiles[indexPath]) {
		console.log(`✅ Found index file: ${indexPath}`)
		return contentFiles[indexPath]
	}

	// Try with trailing slash removed (in case of /boring/ -> boring)
	const slugWithoutTrailingSlash = normalizedSlug.replace(/\/$/, '')
	const indexPathNoSlash = `/src/lib/content/${slugWithoutTrailingSlash}/index.md`
	if (contentFiles[indexPathNoSlash]) {
		console.log(`✅ Found index file (no slash): ${indexPathNoSlash}`)
		return contentFiles[indexPathNoSlash]
	}

	// Fallback: search by pattern matching
	const allKeys = Object.keys(contentFiles)
	const patternMatch = allKeys.find(
		(key) => key.endsWith(`/${normalizedSlug}.md`) || key.endsWith(`/${normalizedSlug}/index.md`),
	)

	if (patternMatch) {
		console.log(`✅ Found by pattern match: ${patternMatch}`)
		return contentFiles[patternMatch]
	}

	console.log(`❌ No file found for slug: ${slug}`)
	console.log(`❌ Available files: ${allKeys.slice(0, 10).join(', ')}...`)
	return null
}

/**
 * Get all available content paths (useful for debugging or navigation)
 * @returns Array of available file paths
 */
export function getAvailableContentPaths(): string[] {
	return Object.keys(contentFiles)
}
