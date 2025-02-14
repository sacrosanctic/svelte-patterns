---
title: Why Use Load Function When There Is A Script Tag
publish: false
tags: 
---

## Describe the problem

This is following the principals of seperation of concern. In this case, is regarding UI and data.

`+page.svelte` is intended to handle the UI and `+page.js#load()` is for managing the data.

This seperation improves maintainability, keeps the UI declarative and focused on presentation and ensure that data logic remains reusable and easier to test

### Pros

- `SSR` support

### Cons

- `fetch` will run multiple times
