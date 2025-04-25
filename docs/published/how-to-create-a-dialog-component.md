---
title: How To Create A Dialog Component
publish: false
tags: component
---

<script setup>
import SvelteRepl from '../../Svelte.vue'
import FactoryApp from './how-to-create-a-dialog-component/factory-App.svelte?raw'
import FactoryDialog from './how-to-create-a-dialog-component/factory-Dialog.svelte?raw'
import SingletonApp from './how-to-create-a-dialog-component/singleton-App.svelte?raw'
import SingletonDialog from './how-to-create-a-dialog-component/singleton-Dialog.svelte?raw'
</script>

## Factory pattern

:::code-group
<<< ./how-to-create-a-dialog-component/factory-App.svelte [App.svelte]
<<< ./how-to-create-a-dialog-component/factory-Dialog.svelte [Dialog.svelte]
:::
<SvelteRepl :files="[
	{
		name:'App.svelte',
		contents:FactoryApp,
	},
	{
		name:'Dialog.svelte',
		contents:FactoryDialog,
	},
]" />

<!-- ## Scoped pattern

https://svelte.dev/playground/hello-world?version=5.28.2#H4sIAAAAAAAACqVTwW6cMBD9lZHbA0ho0e4RAU3VHir1kA-oeyAwm1jx2pY9aVJZ_vfKxhR2u2kq9YJg3pt5M_MGz9RwQtawLyilhmdt5QQFToJwKlnFjkKiY803z-inibwYYNWS9dGYnfuBkmLsbnB4LT5qRajIsYa1brTCUM8VJ3Ey2hJ8FoPU93C0-gSc7er5O2dztmHeGlSX7DW2yWjrVUa1M5wk25Ve95GXMVYxwhdiDdknDNUrw57pnM97Cf19ZA8O6VOkvBCEZZjtxBIJcg3o4L2jgbAoF0QbVGv4OEiHEcuoh_FByMmighBZxmrjikxYhQvOptQ1Z5WPEKdYt4HClV3vV3VXLYJpO5EaUiuXi57LJXLn4zOAVqPUDjtflF2fq6R-Q9oH-BuLakK7DPthV5SBK4D2qO0JTkgPeurWTvuIAbR3T0Ra9bdf2zq_pqQ6ZiVjp9-mK65WlbyYJPNvpv9xYOfGX4PfMv_-DfNHrRxB3ma3oW8sKy-W7985JYxZz2afFsmpNX3-ZxZH921teq58nTNCMm9eYzJMjI-zYeksZsVdNK9YapdchdDH2fcbA650cXi1i8N_d3G41sW5qd8rRoOQz0JNrJnv7hcpG8_28QQAAA== -->

## Singleton pattern

:::code-group
<<< ./how-to-create-a-dialog-component/singleton-App.svelte [App.svelte]
<<< ./how-to-create-a-dialog-component/singleton-Dialog.svelte [Dialog.svelte]
:::
<SvelteRepl :files="[
	{
		name:'App.svelte',
		contents:SingletonApp,
	},
	{
		name:'Dialog.svelte',
		contents:SingletonDialog,
	},
]" />

## Reference

- https://svelte.dev/playground/modal - Example by the core team.
- https://www.captaincodeman.com/dealing-with-dialogs-in-svelte#types-of-modal-dialogs - Captaincodeman goes into on the types of dialogs and advanced feature like transitions.
