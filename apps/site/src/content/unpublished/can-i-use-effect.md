---
title: Can I Use Effect
publish: false
tags:
---

## Describe the problem

It is primarily an escape hatch.

Cons:

- it is async
- needs to be cleaned up, aka $effect.root, which itself also needs cleaning up

#1 use derived

#2 run your code directly where an $effect can be triggered
in a `oninput` instead of an $effect
use an event listener

#3 use getters/setters

#4 use createsubscriber

#5 use the template effect
the html template is wrapped in an implicit effect

####3 so when can i use it

too many event listeners

if none of the above applies to you

if you dont control all your sources
you dont own the state that it is reacting to

side effect (output)
when no other option is available to you

inside an svelte action

inside an attachment

## Reference

- https://svelte.dev/docs/svelte/$effect#When-not-to-use-$effect
- https://ricciuti.me/blog/effect-is-fine-but-proxies-are-better

tbd
https://www.htmlallthethings.com/blog-posts/understanding-svelte-5-runes-derived-vs-effect

https://joyofcode.xyz/how-to-share-state-in-svelte-5#shared-state-on-the-server

alternative provided by the docs
Instead, use oninput callbacks or — better still — function bindings where possible (demo):
https://svelte.dev/docs/svelte/$effect#When-not-to-use-$effect

option to not use effect
https://github.com/sveltejs/svelte/pull/15069

why is it so hard to exlpain
https://bsky.app/profile/paolo.ricciuti.me/post/3m7ycmxoiqc2y

https://bsky.app/profile/paolo.ricciuti.me/post/3m7wu5i2xr22g
