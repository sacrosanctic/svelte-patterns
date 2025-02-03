# How To Add A Confirmation

```js
// prettier-ignore
const confirmation = (node, {
	callback = () => {},
	predicate = () => true,
	warningMessage = 'Are you sure?'
}) => {
	const handler = (e) => {
		const confirmed = confirm(warningMessage)
		confirmed ? callback() : e.preventDefault()
	}

	$effect(() => {
		return predicate() && on(node, 'click', handler)
	})
}
```
