---
title: Javascript Concepts You Should Know
publish: false
tags:
---

Svelte 5's reactivity heavily reactives on JS fundementals, here are some to get familiar with.

## Reassignment vs Mutation

In JavaScript, understanding reassignment and mutation is essential when working with variables and data structures.

Reassignment refers to changing the value a variable points to. This is possible with all variables, whether they are let, const, or var (though const is restricted to reassignment after initialization).

```js
let x = 5;
x = 10;  // Reassigned value
Mutation refers to modifying the contents of a mutable data structure (like arrays or objects) without changing the reference to that data. For example, modifying an object property or an array element doesn't change the object or array's reference.
```

```js
const obj = { name: 'Scott' }
obj.name = 'John' // Mutated property

const arr = [1, 2, 3]
arr.push(4) // Mutated array
```

While reassignment creates a new value or reference, mutation changes the existing value in place.

## Boxing

**Boxing** refers to the process where a primitive value is contained within a wrapper object. This concept is often used when we talk about **primitive types** being temporarily converted to their corresponding object types to provide access to methods and properties.

For example, an **object** itself can be boxed into a wrapper. When you work with primitive types in JavaScript, such as numbers or strings, they can automatically be wrapped in their corresponding object type for accessing methods:

```js
const obj = { name: 'Scott' }

// The object itself is a non-primitive (reference type), but the concept of boxing is about temporarily "wrapping" a primitive in an object if needed.
const nameLength = obj.name.length // Accesses the 'length' method on the primitive string inside the object
console.log(nameLength) // 5
```

Boxing in this sense refers to containing the value within an object temporarily, providing access to its methods and properties. This process allows primitives to act like objects when necessary.

## Immutable Module Exports

In JavaScript (particularly in Node.js), modules are cached after their first evaluation. This means module exports are essentially immutable by design, as they retain the same reference once the module is imported.

Immutable module exports refer to the idea that, once a module is loaded, its exports cannot be reassigned. However, you can mutate the properties or methods that are exported if they are mutable data structures.

```js
// a.js
module.exports = { counter: 0 }

// b.js
const a = require('./a')
a.counter = 5 // Mutation allowed
```

However, if you attempt to reassign the entire export object, it won’t work as the object reference is cached after the first import.

```js
// This will throw an error because the export reference is immutable
a = { counter: 10 } // TypeError: Assignment to constant variable
```
