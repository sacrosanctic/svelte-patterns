<!-- https://svelte.dev/playground/hello-world?version=5.19.3#H4sIAAAAAAAACm1QTU_DMAz9K8EctkmjvUftEEJIgwNIDE4EoaR1t4h8KTEbW9X_jtKxceFk--nZ7z334KRF4LBEYzzb-WhaNsVWE7YzmEOnDSbgbz3QPmReBmB-2roJoUhbNJQxJRP-hzfeETpKwKFKTdSBFsIxpm3wkZg5rChqt2Zd9JZNzOEqjfNEOEGNd4mY8orVrM-AIAGEiX6vC-AnmLIzfmbRuDzqcgFLzboccMdC9OsorcWYLgScyMOxGcvwJ9x4G1h9tljkOWJKL_7ONb7F9vX5_tbb4B06mj6snh6Lo3nd7afKq9lMuKo8Z64k20TsagEbopB4WR5TGKmKFrfXVCuZdHOZT9d9FhsEMJJxjVQL-FBGuk8Bi_yAqpQLmAPhNwGn-IXD-_ADZ1_orM0BAAA= -->

<script lang="ts">
	import pkg from 'lz-string'
	import output from './output.json'
	import { rootLayout, globalCss } from './strings.js'

	const { compressToEncodedURIComponent } = pkg

	type Props = {
		// name?: string
		files: { name: string; contents: string }[]
	}
	let props: Props = $props()

	type FileSystemNode = { file: { contents: string } } | { directory: Tree }

	interface Tree {
		[name: string]: FileSystemNode
	}

	const addFileToTree = (tree: Tree, path: string, contents: string) => {
		const parts = path.split('/')
		let current = tree

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i]

			if (i === parts.length - 1) {
				// Last part, add file
				current[part] = { file: { contents } }
			} else {
				// Create directory if it doesn't exist
				if (!current[part] || !('directory' in current[part])) {
					current[part] = { directory: {} }
				}
				current = current[part].directory
			}
		}
	}

	const injectCss = (tree: Tree, path: string, importPath: string) => {
		const parts = path.split('/')
		let current = tree

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i]
			if (!current[part]) return
			if (i === parts.length - 1) {
				const fileNode = current[part]
				if (!('file' in fileNode)) return

				const original = fileNode.file.contents
				const importLine = `\timport "${importPath}"`

				const scriptMatch = original.match(/(<script[^>]*>)([\s\S]*?)<\/script>/)
				// this one accounts for script module
				// const scriptMatch = original.match(/(<script(?![^>]*\bmodule\b)[^>]*>)([\s\S]*?)<\/script>/)

				let updated

				if (scriptMatch) {
					const newScript = `${scriptMatch[1]}\n${importLine}${scriptMatch[2]}\n</___a___>`
					updated = original.replace(scriptMatch[0], newScript)
				} else {
					updated = `<___a___>\n${importLine}\n</___a___>\n\n${original}`
				}

				// <__a__> is needed because vue gets a compile error
				fileNode.file.contents = updated.replaceAll('___a___', 'script')
			} else {
				if (!('directory' in current[part])) return
				current = current[part].directory
			}
		}
	}

	const fileSystemTree = structuredClone(output)

	addFileToTree(fileSystemTree, 'src/routes/+layout.svelte', rootLayout)
	addFileToTree(fileSystemTree, 'src/global.css', globalCss)
	props.files.forEach(({ name, contents }) => {
		addFileToTree(fileSystemTree, name, contents)
	})
	injectCss(fileSystemTree, 'src/routes/+layout.svelte', '../global.css')

	const hash = compressToEncodedURIComponent(JSON.stringify(fileSystemTree))
</script>

<a target="_blank" rel="noopener noreferrer" href="https://sveltelab.dev?t=basic#code={hash}"
	>Sveltelab Playground</a
>
