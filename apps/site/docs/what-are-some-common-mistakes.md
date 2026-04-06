---
title: What Are Some Common Gotchas
---

We outline some common gotchas or un-intuitative bahaviour in svelte

In svelte 4, you had to do this.

```svelte
<script>
	let arr = [0, 1]

	function handleClick() {
		arr.push(2)
		arr = arr // [!code highlight]
	}
</script>
```

> https://v4.svelte.dev/docs/svelte-components#script-2-assignments-are-reactive

It was unintuitive that you had to reassign arrays and objects to trigger reactivity. Svelte 5 also has its own set of unintuitive patterns. Here, I will attempt to document them.

## Destructuring can break reactivity

Either use `data.foo` or add a `$derived` rune.

```svelte
<script>
	let { data } = $props()
	const { foo } = data // [!code --]
	const { foo } = $derived(data) // [!code ++]
</script>

{foo}
```

[Example](https://svelte.dev/playground/hello-world?version=5.28.1#H4sIAAAAAAAACr1WXY_iNhT9K1eZSgtaPhN2tPIA3b71oVWrvvRh2QcT34A7jh3ZBmaE8t9XTuKEhDBsq1FlIYzvvT73HJ84nANJUwxI8CsKoeCktGAwQMYtsmEwChIu0ATk6zmwr5nLcwvByFf9kmUTc0Rh3dqWGuxbj5W0KK0JSLA0seaZXW8kAE8zpS38hTS2_Ii_U6v5CyRapfBhMi1_Vpt82EhXIdCCUQcdI6zgJ2OpxcEZBB5RzAlUs5DAHPJ86ApiJY2FJkWjOQg7h9zVM9T8iGxQ7vhGfljkl2l9WQ1wmR9B_qMA3dJFWeqxltNar41cdpQ6V2xyPwvrWVTPFrmrtecHI3mWoQWrst8wsYNh7tY3drk9WKskKBkLHj-vzoPhal3iT8ouy6_w48e8Widw7kvIl9NyrxJxWiHmjka79fVGBqPA4osNiNUHzEc37NUyQdth3dANkznLnD3pkTeAn4R-Eo2aA3BHl2mVmcHwqXsEjB8hFtSY1aZApFyi3gQFVCuYFu2Nuzn9WXuk7CKlTFqfv2iUDLXv_ufJYJgvpy7Uyvtj-w_G7jlKUKOMsSflT81T7vTvz_Lz2x1qdeq0V2dodWoI_M3tvjb-dSNX8qAQmwAYtXR8pOKAK29q76m6HGAZK4brKr6cFr8IdAtquP8OHt1CjbqoUS_c-8qpDvY9FA3vKBp2uYXvqOjiFuqii7p4U9Fm1mi8NPZVYBEkWikL57JmPN7uxrESShM47bnFJ7_uLh4feYiiqA6Uuo-3OwIPycyNOuSoFYH2VlulXYXfjDHWVCiG1Vaf3GhQ-G4v-G7f9JAkj9vHbZGQl7b5kiLjFAaZds-rKTPHJt5jigQY1c9Dz7NFuk37YU7deGpiLeo4c-Miesk_jN24CNYKOMka1XpUWCwWl3W1DuEnNy7x3lKi0KIWZFLfpJ7qlsbPO60OkvnqI9WDhv6w2qUVbPj7cEYZ43JHYK4xrdYqPpoyfjAEPmcvVcBqKg23XEkCVAiYTSIDSI03REpfxifO7J7A59msLkup3nFJYAb0YNXlOU-67wnPjnGTCfpKYKe595Sbji2mmaAWHYtDKg0p9oR5ot3HZ9KMwLzGvynVxbkNW9yLajBKcHY3t9ZpUQOqI-pEqBOBPWcMZR_l0mxXfP17_I2SNbi7544Nai_7ZhMl7fiEzm4EtkqwKwOEzTk7m1DBd5JAjNKi7mtHq9OPtd_c6f9b19pV9DoNhbjXRfWoXz8ij_9SoQLMXQB3EctL4goxzF4ubNXxW1QHCpUSmnLxSiBVUpmMxniro68XL6hNMN8E33x77bNo305Dv91y6t847T-x30aBpVycuGQBSagwmH8Ha0y7D14NAAA=)

In JavaScript, [destructured declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) are evaluated at the time of destructuring. <a href="https://github.com/sveltejs/svelte/issues/11911#issuecomment-2195478261"><Badge type="tip" text="src" />
</a>

## Intermediate variables can break reactivity

Either use `data.foo` or add a `$derived` rune.

todo: seperate intermediate and destructure

```svelte
<script>
	let { data } = $props()
	const foo = data.foo // [!code --]
	const foo = $derived(data.foo) // [!code ++]
</script>

{foo}
```

[Example](https://svelte.dev/playground/hello-world?version=5.28.1#H4sIAAAAAAAACr1WXY_iNhT9K1eZSgtaPhN2tPIA3b71oVWrvvRhsw8mvgF3HTuyDcwI5b9XTuKEhDDTVqPKQlx8P8_xicMlkDTDgAQ_oxAKzkoLBiNk3CIbB5Mg5QJNQL5eAvuSuzi3EUx81k95PjMnFNbt7ajBof1ESYvSmoAEa5NontttLAF4litt4Q-kieUn_JVazZ8h1SqDD7N59bMu8iGWLkOgBaOOOkHYwA_GUoujCwg8oVgSqK2QwBKKYuwSEiWNBY3mKOzS5TDU_IRsVFWZVak3oSFsoBPRD4ju1qq-wpuSq37JOjCW63nDSSzXPTYu9eyFt8LGihprVbhce3kwkuc5WrAq_wVTOxoXbj-2693RWiVByUTw5PvmMhpvtkPTfPxY1PsELkMBxXpe1ao6zuuOhYPRHX0by2ASWHy2AbH6iMXkjoQ6B91VUd91R0hOFhcPeuKP2xuhN6JJcxaFO79cq9yMxk_9I2D8BImgxmzisiPlEnUclK06zqwcb9qPGY46IGVXIVXQ9vJFo2So_fQ_zkbjYj13rk7cb7u_MHHPSooaZYIDIb9rnnHH_3CUt-9PqNW5N14TodW5BfAnt4dG_beD3NCDQsQBMGrp9ETFETde1F5TTTrAOlEMt7V_PS9_EegnNO3-e_PoXteo3zUabPe-dKqjfQ9GwzcYDfvYwndkdHWv66rfdfUqo63Vcrw29kVg6SRaKQuXKmc63e2niRJKEzgfuMUnv-8uHu95iKKocVS8T3d7Ag_pwq3G5aCVjm6pndIuwxdjjLUZimFd6pNbbRe-Pwi-P7QzpOnj7nFXBhSVbL5kyDiFUa7d82qqyKlJDpghAUb197HH2QHdhf2wpG49tb4OdFy4deW9xh8mbl05GwYcZS1rAyysVqvrvIaH8JNb1_1eY6LkoiFk1tykHuqOJt_3Wh0l89knqkct_HFdpeNs8Xt3Thnjck9gqTGr92o8mjJ-NAQ-58-1w2oqDbdcSQJUCFjMIgNIjRdERp-nZ87sgcDnxaJJy6jec0lgAfRo1fU5z_rvCY-OcZML-kJgr7nXlDOnFrNcUIsOxTGThpQ1YZlq9_GRNCewbPrfperq3MYd7GU2GCU4ezO24WnVNFQn1KlQZwIHzhjKIciV2G7w-vf4KylbcHfPGzJotOyHTZW00zM6uRHYKcFuBBC25-xkQgXfSwIJSot6aBytzv9s_PZO_9-m1i5jUGkoxFtT1I_67SPy-C8ZKpu5C-DNjtUlcdMxzJ-vZNXTW9Q4SpZSmnHxQiBTUpmcJnhvoq9XL6g4WMbBNz9e9yy6t9PYl1vP_Run-yf22ySwlIszlywgKRUGi78Bp3DiwEINAAA=)

## `data` in `$state` will not receive upstream updates

```svelte
<script>
	let { data } = $props()
	const foo = $state(data.foo) // [!code --]
	const foo = $derived(data.foo) // [!code ++]
</script>

{foo}
```

## Module exports are immutable

`$state` should be used with an object so it can be mutated.

```js
//util.svelte.js
export const value = $state(5) // [!code --]
export const value = $state({ current: 5 }) // [!code ++]
```

## Direct DOM maniputation will desync the Svelte's runtime

Let svelte change the DOM

```svelte
<script>
	let value = $state(0)
</script>

<button onclick={(e) => (e.currentTarget.innerHTML = 4)}>{value}</button> // [!code --]
<button onclick={(e) => (value = 4)}>{value}</button> // [!code ++]
```

## Avoid using browser globals

```svelte
<script>
	const input = document.getElementById('id') // [!code --]
	let input // [!code ++]
</script>

<input id="id" /> // [!code --]
<input bind:this={input} /> // [!code ++]
```

```svelte
<script>
	const handler = () => console.log('Boo!')
	const input = document.getElementById('button') // [!code --]
	button.addEventListener('click', handler) // [!code --]
</script>

<button id="button">click to see</button> // [!code --]
<button onclick={handler}>click to see<button> // [!code ++]
```

```svelte
<script>
	const onresize = () => console.log('Window resized!')
	window.addEventListener('resize', onresize) // [!code --]
</script>

<svelte:window {onresize} /> // [!code ++]
```

<!--
# child mounts then parent mounts

severity high
affect: react

https://github.com/sveltejs/svelte/issues/2281#issuecomment-734935164

the is because svelte uses the real DOM, where as react using a virtual DOM

it uses the `stack` data structure, first in last out, the parent will start the render, but will finish last

# values reactively update even when not marked as reactive

severity low
effect: react

https://svelte.dev/playground/hello-world?version=5.43.2#H4sIAAAAAAAAA22Ny27CMBBFf2U06oKIiNCtSSL1seg_NF0Ye2gtzNiyJ6Uoyr9XoUC6YHnvnDl3QNYHQoVv5H2AY0jewoKsE7IFlrhznjKq9wHlFCduKrC8fj3FuMrf5GXqtjrTvd4EFmLJqLDOJrkobccAAJ4EOKSD9i-hZ4EGBtOnRCwK1uNmhrJooSvzcE6LdbHpuK5uwo7r2D5rs_9MoWcLZsIVDP8GVhf7WFexPfOvLkevTzd4HrowHdfbXiQwBDbemX0zLIqmHTru5I55uZwOs2XK49hqa-ERJMA2yFdd_RlbLFHoR1BJ6mn8KFG080fHFtVO-0zjL8SyAuqdAQAA
if you inspect the js output form the `repl`, you'll see the following line

```js
$.template_effect(() => {
	$.set_text(text, `Background count: ${normalCount ?? ''}`)
	$.set_text(text_1, `Display count: ${$.get(stateCount) ?? ''}`)
})
```

even though `normalCount` is not reactive, it is grouped together with `stateCount` in one `template_effect`. It it will be updated as a side effect.

svelte groups template by blocks, so if you seperate them as in this example, it stops updating
https://svelte.dev/playground/hello-world?version=5.43.2#H4sIAAAAAAAAA22PzW7CMBCEX2W17YGIiNBrCJH6c-g71D2YxAELs7bsTSmy_O6VaSGtynFnv5mdjUjyoLDGV2WMhaP1poeZ6jWrvsASB21UwPotIp9c5rKA5cX16NwifCjDWdvIoG7pnSVWxAFrbELnteNWEACAUQxk_UGaZzsSwxpiN3qviGtYptUEBZasLsz9eZoti5UgQYIFn5GdPU5L9qMqBDXV9Z6geKeHM5YENa59kt1-6-1IPXQ5uYb4q8vip0hqKtcKipUe0r-IFx2ckaerf6r51yao2YzMlsBSZ3S3X8dZsW5jbn_j5nyeF1NYnlNqZd_DA7CFjeVdU30ntlgiq0_GOr-c3ktkqc1RU4_1IE1Q6QszxpNk4gEAAA

## the fix

the fix is simple

- If a value changes, it should be a $state
- if it doesn't, then it should be a const. -->
