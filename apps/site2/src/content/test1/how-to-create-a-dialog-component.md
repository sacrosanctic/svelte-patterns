---
title: How To Create A Dialog Component
description: Learn different patterns for creating reusable dialog components in Svelte
---

## Single Component

**App.svelte (factory pattern):**
```svelte
<!-- Factory pattern implementation -->
```

**Dialog.svelte (factory pattern):**
```svelte
<!-- Factory dialog implementation -->
```

**Interactive Example - See source code in ./how-to-create-a-dialog-component/factory-App.svelte and ./how-to-create-a-dialog-component/factory-Dialog.svelte**

<!-- ## Scoped pattern

https://svelte.dev/playground/hello-world?version=5.28.2#H4sIAAAAAAAACqVTwW6cMBD9lZHbA0ho0e4RAU3VHir1kA-oeyAwm1jx2pY9aVJZ_vfKxhR2u2kq9YJg3pt5M_MGz9RwQtawLyilhmdt5QQFToJwKlnFjkKiY803z-inibwYYNWS9dGYnfuBkmLsbnB4LT5qRajIsYa1brTCUM8VJ3Ey2hJ8FoPU93C0-gSc7er5O2dztmHeGlSX7DW2yWjrVUa1M5wk25Ve95GXMVYxwhdiDdknDNUrw57pnM97Cf19ZA8O6VOkvBCEZZjtxBIJcg3o4L2jgbAoF0QbVGv4OEiHEcuoh_FByMmighBZxmrjikxYhQvOptQ1Z5WPEKdYt4HClV3vV3VXLYJpO5EaUiuXi57LJXLn4zOAVqPUDjtflF2fq6R-Q9oH-BuLakK7DPthV5SBK4D2qO0JTkgPeurWTvuIAbR3T0Ra9bdf2zq_pqQ6ZiVjp9-mK65WlbyYJPNvpv9xYOfGX4PfMv_-DfNHrRxB3ma3oW8sKy-W7985JYxZz2afFsmpNX3-ZxZH921teq58nTNCMm9eYzJMjI-zYeksZsVdNK9YapdchdDH2fcbA650cXi1i8N_d3G41sW5qd8rRoOQz0JNrJnv7hcpG8_28QQAAA== -->

## Decoupled

**App.svelte (singleton pattern):**
```svelte
<!-- Singleton pattern implementation -->
```

**Main.svelte (singleton pattern):**
```svelte
<!-- Main content for singleton -->
```

**Dialog.svelte (singleton pattern):**
```svelte
<!-- Singleton dialog implementation -->
```

**Interactive Example - See source code in ./how-to-create-a-dialog-component/singleton-App.svelte, ./how-to-create-a-dialog-component/singleton-Main.svelte, and ./how-to-create-a-dialog-component/singleton-Dialog.svelte**

<!-- ## Something

maybe decoupled global vs decoupled instance

whats the difference, global means theres only 1 per sveltekit app
instanced lets you have multiple, though im not sure how applicable that is in a dialog context


:::code-group
<<< ./how-to-create-a-dialog-component/x-App.svelte [App.svelte]
<<< ./how-to-create-a-dialog-component/x-Main.svelte [Main.svelte]
<<< ./how-to-create-a-dialog-component/x-Dialog.svelte [Dialog.svelte]
:::
<SvelteRepl :files="[
	{
		name:'App.svelte',
		contents:xApp,
	},
	{
		name:'Main.svelte',
		contents:xMain,
	},
	{
		name:'Dialog.svelte',
		contents:xDialog,
	},
]" /> -->

## Reference

- https://svelte.dev/playground/modal - Official Example
- https://www.captaincodeman.com/dealing-with-dialogs-in-svelte#types-of-modal-dialogs - Captaincodeman's deep dive
