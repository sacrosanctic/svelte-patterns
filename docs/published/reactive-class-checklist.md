---
title: Reactive Class Checklist
publish: false
tags:
---

## What To Do

### Use `current` as the main output name

This signals to the user of the class what is the intended output of the class.

```ts
class Foo {
	#current = $state()

	get current() {
		return this.#current
	}
}
```

### Keep your values private and immutable

You don't want side effects in your internal state

```ts
class Foo {
	#reactive = $state()
	#notReactive
	#readonly = $state()

	get readonly() {
		return this.#readonly
	}
}
```

## What not to do

### Do not use `$effect.root`

Use [createSubscriber](https://svelte.dev/docs/svelte/svelte-reactivity#createSubscriber) instead.

```ts
class Foo {
	constructor() {
		$effect.root(() => {
			// do thing
		})
	}
}
```

## Reference

- https://www.youtube.com/live/BGNykPO4L7c?si=5i9UraSuDuYVq8R5&t=5767
