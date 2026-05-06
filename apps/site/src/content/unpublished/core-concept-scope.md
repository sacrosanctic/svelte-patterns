# Core Concept: Scope

Everything in Svelte is scoped. Why? Because it creates a clearer picture of who/what owns the entity. Easier to reason about and troubleshoot. You're able trace the problem from within the scope.

What is `scope`? `Scope` is when the particular thing is limited in some way, only accessible and interacts within that limit. The antitheisi to a `global`.

In every instance, there is an escape hatch to enable global. But its discouraged and should only be used when no better option is available.

## Component scope (atomic unit)

- styles defined in a component only applies to html in the same component src https://svelte.dev/docs/svelte/scoped-styles
  example of scope in action
  example of escape hatch `:global(...)` https://svelte.dev/docs/svelte/global-styles#:global()
  https://svelte.dev/playground/ed63117e737e4927a5d54ffb4d0bc008?version=5.19.3

but when styles are scoped to a component,i cannot style the children from the parent
[This is important and its not changing](https://github.com/sveltejs/rfcs/pull/22#issuecomment-664047806)

- keyframes defined in component only applies to html in the same component src https://svelte.dev/docs/svelte/scoped-styles#Scoped-keyframes

example of scope in action
example of escape hatch @keyframes -global-my-animation-name https://svelte.dev/docs/svelte/global-styles#:global()

- state declared in a component is only accessiable from within the component
  example of scope in action
  example of escape hatch no excape hatches

## Svelte block scope

Ordinarily, transitions will only play on elements when their direct containing block is added or destroyed
https://svelte.dev/docs/svelte/transition#Local-vs-global

example of scope in action
example of escape hatch no excape hatches
https://svelte.dev/tutorial/svelte/global-transitions

## Layout Scope

+layout.svelte allows you to define shared UI elements for its children and their descendants

+layout.js allows you to define shared data / reactive state for its chidlren and their descendants
