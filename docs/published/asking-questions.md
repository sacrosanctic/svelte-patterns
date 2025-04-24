---
title: Asking Questions
---

## Use Code Blocks

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

## Make a repl

TBD

## The best way

Ultimately, there's no single 'best' approach, only [tradeoffs](https://www.youtube.com/watch?v=1nENigGr-a0). On a small scale, these tradeoffs are often negligible. And during prototyping, [premature optimization](https://softwareengineering.stackexchange.com/a/80092) is generally discouraged. However, if optimization is the goal, what specific metrics are you aiming to improve?

<!-- Even when Rich Harris criticizes this point as a scarity mindset, he is still optimizing for something, and in his case, the developer experience (DX).

https://youtu.be/UegUi2fWBaU?list=PLHas3BpLuCWCTu9Hmmfz0K8h4TR4vw1nO&t=927 -->

## XY Problem

https://xyproblem.info/

## Don't ask to ask

https://dontasktoask.com/

## Prior Art

- [Stack Overflow Guide](https://stackoverflow.com/help/how-to-ask)
- http://catb.org/~esr/faqs/smart-questions.html
