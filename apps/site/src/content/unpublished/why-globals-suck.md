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

this is a bad take
a false equiviency, you make it seem like the choice is 50/50
which its not, its more like 95/5 and 95 has many options

it doesnt take a lot to go from simple to complex

the problems dont go away even in a small code base, you are simply able to fix it quicker, and building bad habits
why not just build good habits by uilding the right way the first time

when you have to put so much cautin tape over it, you think its still a good practice

globals are so bad that, almost every abstraction created is about getting away from globals, the only reason you feel safe and that it "saves time" is becuase there's already so much guard rails around it

globals exist because it is fundental to programming and computer science, but it doesnt mean its good. Heck, i could see if a future language where globals are disable in userland

people always talks about best practices like clean code, separation of concerns, SOLID

the worst part about globals are they people think its actually good to use

call it a shortcut, a hack, an escape hatch, but it aint good

can shadow other variables, not as big of a problem in js modules
