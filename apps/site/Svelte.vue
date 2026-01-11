<script setup>
import { compress_and_encode_text } from './utils'
import { ref, onMounted } from 'vue'

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	files: { type: Array },
})

const _path = ref()

onMounted(async () => {
	const data = {
		name: props.name,
		files: props.files.map((_) => {
			return {
				type: 'file',
				name: _.name,
				basename: _.name,
				contents: _.contents,
				text: true,
			}
		}),
	}

	_path.value = await compress_and_encode_text(JSON.stringify(data))
})
</script>

<template>
	<a
		target="_blank"
		rel="noopener noreferrer"
		:href="'https://svelte.dev/playground/hello-world#' + _path"
		>Svelte Playground</a
	>
</template>
