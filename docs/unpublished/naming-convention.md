---
title: Naming Convention
publish: false
tags:
---

## Explicit $effect dependencies

```svelte
import {untrack} from 'svelte'
$effect(()=>{
	void count // void is used to signal this is an explicit dependency
	untrack(()=>{
		total+= count
	})
})
```

## Reactive object values

state needs to be boxed in order to be reactive, in cases where the value is only a primitive and is the only property, a filler prop name is used. It is stardard to use `current`.

```js
export const thing = $state({ current: 5 })
```

### Prior Art

- https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery
- https://runed.dev/docs/utilities/previous
