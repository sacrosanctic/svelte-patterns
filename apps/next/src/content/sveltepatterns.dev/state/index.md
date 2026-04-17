---
title: State
category: concept
---

State in the abstract sense refers to `state machine` in mathamatics. In the context of webdev, state represents the current condition of your application which in turn determines and what and how the UI should display. And in Sveltekit (and other metaframeworks), state can be on the server or the client. This is important to keep in mind as secrets can be leaked if not careful.

# Client State

If you're familiar with Svelte, the first thing that comes to mind is `$state`. But did you know, theres 3 places you can store state on the client? In web development, state can live in different places: HTML, CSS, or JavaScript. Each has tradeoffs. Using HTML or CSS for state is more performant and works even when JavaScript fails to load. This follows the [Rule of Least Power](./rule-of-least-power).

## HTML

Some state lives natively in HTML elements. Form inputs like checkboxes, radio buttons, and text fields hold state that CSS can detect and respond to. This means you can create interactive UIs without writing any JavaScript.

The checkbox below controls the element's appearance using only CSS. The `<input type="checkbox">` holds the state, and the `:checked` selector in CSS responds to that state.

:::svelte-repl
<<<./App.svelte
:::

This pattern works because:

- The checkbox stores its checked/unchecked state in the DOM
- CSS can detect that state with the `:checked` pseudo-class
- The `~` sibling selector applies styles based on that state

The state is declarative—the browser handles the logic. Your CSS just describes what should happen.

## CSS

## JavaScript

When HTML and CSS can't handle your state, JavaScript steps in. Svelte 5 uses `$state` to create reactive state in your components.

```svelte
<script>
	let name = $state('world')
	let count = $state(0)
</script>

<h1>Hello {name}!</h1>

<input bind:value={name} />
<button onclick={() => (count += 1)}>
	clicks: {count}
</button>
```

see (./reactivity)

# Server State

# Resource

https://developer.mozilla.org/en-US/docs/Glossary/State_machine
https://www.reddit.com/r/learnprogramming/comments/1g5yxci/state_machines_for_a_beginner/
