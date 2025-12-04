---
title: Why Globals Suck
publish: false
tags:
---

## Describe the problem

https://discord.com/channels/457912077277855764/1440299904168759366

🧩 Why globals mean less encapsulation

Encapsulation = keeping state + behavior contained inside a module/class/function so only the intended API leaks out.

A global variable breaks that because:

1. Everyone can access it

Any file, function, or module can read/modify a global.
→ This makes the state shared implicitly instead of explicitly passed.

2. You lose control over who mutates it

Encapsulation gives you controlled access (e.g., private fields, setters, closures).
Globals remove this boundary.

3. Implicit dependencies

A function that uses a global doesn’t show that dependency in its parameters.
→ Harder to test, mock, or refactor.

4. Harder to reason about state

Encapsulated state = predictable.
Global state = you need to consider anything else that might touch it.

5. Harder to reuse code

A function that depends on global state is tied to that environment.

✔️ When globals are not harmful

If used intentionally and sparingly:

Constants (MAX_SIZE, regexes, feature flags)

Singletons that represent actual singletons (e.g., a logger)

Config objects loaded once at startup

Frameworks that provide their own boundaries (e.g., Svelte stores, TS namespaces, dependency injection)

what to do instead? scoped state

it forces you to actually declare where it can be accessed, something like context follows the file system hierachy

globals are opaque
https://discord.com/channels/457912077277855764/1446038501635260466
more places than context to start state

parent component
urlsearchparams
sessionstorage
localstorage
database? idb
html data attributes

## Reference
