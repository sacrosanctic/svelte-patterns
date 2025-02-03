<!-- https://svelte.dev/playground/hello-world?version=5.19.3#H4sIAAAAAAAACm1QTU_DMAz9K8EctkmjvUftEEJIgwNIDE4EoaR1t4h8KTEbW9X_jtKxceFk--nZ7z334KRF4LBEYzzb-WhaNsVWE7YzmEOnDSbgbz3QPmReBmB-2roJoUhbNJQxJRP-hzfeETpKwKFKTdSBFsIxpm3wkZg5rChqt2Zd9JZNzOEqjfNEOEGNd4mY8orVrM-AIAGEiX6vC-AnmLIzfmbRuDzqcgFLzboccMdC9OsorcWYLgScyMOxGcvwJ9x4G1h9tljkOWJKL_7ONb7F9vX5_tbb4B06mj6snh6Lo3nd7afKq9lMuKo8Z64k20TsagEbopB4WR5TGKmKFrfXVCuZdHOZT9d9FhsEMJJxjVQL-FBGuk8Bi_yAqpQLmAPhNwGn-IXD-_ADZ1_orM0BAAA= -->

<script setup>
import pkg from 'lz-string'
import { ref, onMounted } from 'vue'
import asdf from './output.json'

const { compressToEncodedURIComponent } = pkg

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	files: { type: Array },
})

const _path = ref()

const addFileToTree = (tree, path, contents) => {
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

onMounted(async () => {
	const fileSystemTree = structuredClone(asdf)
	const data = {
		'src/routes/+page.svelte': 'Hi fellow programmers!',
		'src/routes/a/b/c/test.svelte': 'Hi fellow programmers!',
	}
	props.files.forEach(({ name, contents }) => {
		addFileToTree(fileSystemTree, name, contents)
	})

	_path.value = compressToEncodedURIComponent(JSON.stringify(fileSystemTree))
})
</script>

<template>
	<a target="_blank" rel="noopener noreferrer" :href="'https://sveltelab.dev?t=basic#code=' + _path"
		>Sveltelab Playground</a
	>
</template>
