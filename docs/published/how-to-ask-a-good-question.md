---
title: How To Ask A Good Question
---

<!-- ## What To Do -->

### Use Code Blocks

````
```js
// +page.js
export const load = () => {
	...
}
```
````

````
```svelte
// +page.svelte
<script>
	let name = $state('world')
</script>

Hello {name}!
```
````

```
graph TD
    E(open thread)-->F
    F{Is the question complete?}-->|No|G(request more infomration)-->F
    F--->|Yes|K
    K{What type of question?}
    K-->|Feature Request|H
    K-->|Discussion|L[Discuss]-->D
    H{Does the feature exist?}
    H-->|No|I[Open a Github Issue]-->D
    H-->|Yes|A[link to the docs]-->D
    D(close thread)
```

### Prior Art

- [Stack Overflow Guide](https://stackoverflow.com/help/how-to-ask)
- http://catb.org/~esr/faqs/smart-questions.html

## What Not To Do

- [XY Problem](https://xyproblem.info/)
- [Don't ask to ask](https://dontasktoask.com/)
