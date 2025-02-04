---
title: How to create a minimum reproducible example (MRE)
author: HenryKrinkle
---

> a.k.a. how to get faster help

Often I see people asking questions in the [Svelte Discord](https://discord.com/channels/457912077277855764/1023340103071965194) posting their code in various ways that make debugging challenging. Ranking from worst to best:

- Posting a link to the whole repo.  
:memo: Problem: It's overwhelming and requires too much effort to locate the issue.
- Sharing whole file(s).  
:memo: Same problem: need to comb through unnecessary details.
- Copy-pasting large fragments of unsimplified code directly from the codebase.  
:memo: Problem: It's still hard to find the core issue.
- Sharing a simplified problem.  
:memo: Better, but might still include some irrelevant parts.
- Providing a minimum reproducible example or a simple toy example constructed from the actual problem.  
:memo: Ideal, as it isolates the problem and makes it easy for others to help.

## What is an MRE?

As the name suggests, it should be

- minimal: as small as possible. Doesn't contain any extra code not contributing to the problem.
- reproducible: should contain complete information to reproduce the problem if someone put it on their on computer or a REPL.

## Why an MRE?
- It takes a lot of mental overhead to identify the core issue in a haystack of irrelevant code. If it's too verbose, chances are it's gonna [get ignored](https://discord.com/channels/457912077277855764/1315458188593725540/1320232346997493862). An MRE increases the likelihood of getting help.
- It sharpens your debugging skills by isolating the problem.
- It helps you better understand the issue without the noises and might even lead to solving it yourself.

## How to create an MRE?
### 1. Remove irrelevant details.  
:bulb: A general rule of thumb is: if you can delete something and the problem is still there, you don't need to include that in the reproduction.
- If your object/array has many properties/items, remove most of them but leave only 1-2 for the purpose of illustration. 
Example taken from [source](https://discord.com/channels/457912077277855764/1327981626868764775/1327981821308174368):
```ts
type InvoiceRow = {
    description: string;
    rate: number | undefined;
    quantity: number | undefined;
    amount: string;
};

type InvoiceData = {
    rows: Array<InvoiceRow>;
    currencySymbol: string;
    totalAmount: number;
    notes: string;
    from: string;
    to: string;
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    logoFilename: string;
    logoBase64Img: string;
};

```
Simplified version:
```ts
type InvoiceRow = {
    description: string;
    quantity: number | undefined;
    amount: string;
};

type InvoiceData = {
    rows: Array<InvoiceRow>;
    totalAmount: number;
};
```
- If your function does many things, remove most of them but keep only what's relevant.
[Source](https://discord.com/channels/457912077277855764/1249741448941670471/1250018725109956638)
```js
import { json } from "@sveltejs/kit";
import { statements } from "$lib/db/statements.js";

export async function GET({ url }) {
  try {
    let cliforType;

    if (url.searchParams.get("type") === "customers") {
      cliforType = "0";
    } else {
      cliforType = "1";
    }

    const searchQuery = url.searchParams.get("search") || "";
    const limit = Number(url.searchParams.get("limit")) || 20;
    const offset = Number(url.searchParams.get("offset")) || 0;

    // Use the paginated query
    const rows = statements.getClifor_gen_paginated_search(
      cliforType,
      searchQuery,
      limit,
      offset
    );

    // Get the total count of matching records
    const total = statements.getClifor_gen_count(cliforType);

    const blocked = statements.getBlocked();

    return json({ customers: rows, total, blocked });
  } catch (error) {
    console.error(error);
    return new Response("Get customers: API Error", { status: 500 });
  }
}
```
Simplified version (taken from OP)
```js

export async function GET() {
	const customers = [
		{
			"database_id": "1",
			"rag_soc": "PEZZINI MAURIZIO E C. SNC"
		},
		{
			"database_id": "1",
			"rag_soc": "NAMAGI SNC DI ATTIANESE NADIA E C. AURORA"
		},
	];
	return json({ customers, total: true, blocked: true})
}
```
- If the problem is JS-related, css classes can be removed. Especially tailwind
### 2. Simplify external dependencies
- Replace API calls or database queries with dummy static data with similar structure.
[Example source](https://discord.com/channels/457912077277855764/1308808265270038539/1308828892194279504)
```ts
	const brands = await db.query<SurrealQuery<Brand[]>>(`SELECT * FROM brand`, {});
	//replace with:
	const brands =  [
		{
			id: "1",
			name: 'foo',
		},
		{
			id: "2",
			name: 'bar',
		}
	]; //simplified structure

```
- Replace 3rd party lib APIs with native methods, if possible.  
This step is optional and takes some skills to do. Both the Svelte playground and sveltelabs support importing 3rd party libs. However, this will make people unfamiliar with the lib easier to help.  
Example: see Problem 3 below.
### 3. Make sure the problem is still reproducible
- Use a code sharing platform like [Svelte playground](https://svelte.dev/playground/) or [Sveltelab](https://www.sveltelab.dev/).  
This will eliminate the case of "but it reproduces on my machine".
- Comment your code to explain what the problem is.
- Be clear about what you expect and what happens instead.
- Mention any error messages, logs, or unexpected behaviors.


## Examples from real problems
Below I will show some real problems asked in the Svelte discord server and how they could've been minimized.
### Problem 1 - Something todos
Source: [How sincronize correctly state with snippets and classes](https://discord.com/channels/457912077277855764/1329285855508172810)  
*(Don't click the source if you want to try solving this yourself)*  
[Original REPL](https://svelte.dev/playground/28eb9868e4a74ebea2e5674492d1fdad?version=5.18.0)

Description:

> when the `times` property of each todo reaches to 0 then the todo itslef must crossed-out.

Let's start with something simple. The bug isn't even Svelte-related. To replicate the problem, first you must add a random todo title and a random `times` number. Then, press the button on the newly created todo until `times` reaches 0. The todo isn't crossed out unless you press the button once more.

First, this is a JS problem so I'm gonna remove almost all the css but the `.line-through`:

```html
<style>
	.line-through {
		text-decoration: line-through;
	}
</style>
```

Second, I'm deleting the 'create todo' section since it's irrelevant to the problem. The variables `todoText`, `todoTimes` and the function `validateAddTodo` now serve no purpose and can be removed too. Temporarily delete the `$inspect`, may add it back later if necessary. Now we don't have any todo to show. Add one by calling `todos.addTodo` in the `script` block:

```js
todos.addTodo('foo', 1)
```

This is where we are now: [REPL](https://svelte.dev/playground/888459f5d6d54de5bc02ae3b7a79f568?version=5.18.0)  

Can it be simplified more? Yes. Since we're rendering only 1 todo, I'm deleting the `main` section with the `#each` block. I'm also moving the `span` and the `button` out of the `snippet`, with some modifications, to show the todo directly.

```html
<span>{todos.allTodos[0].times}</span> <button onclick="{()" ="">todos.finishTodo(0, todos.allTodos[0].times)} class={todos.allTodos[0].ready ? 'line-through ' : ''} > {todos.allTodos[0].todo}</button>
```

The problem can still be reproduced. However, all the `todos.allTodos[0]` stuff isn't great. We can simplify all that by declaring a single `todo` and use that directly instead:

```js
let todo = $state({ title: 'foo', times: 1, ready: false })
//changing the `todo` property name to `title` to avoid `todo.todo`
```

The `onclick` handler should be changed too. Copy the `todos.finishTodo` function from the class an alter it to make it work with our single todo:

```js
const finishTodo = () => {
	if (todo.ready) return //  prevents unnecesary executions
	if (todo.times === 0) {
		todo.ready = true
	} else {
		todo.times--
	}
}
```
With some more clean-ups, this is the final reproduction:
```html
<script>
	let todo = $state({ title: 'foo', times: 1, ready: false });
	
	const finishTodo = () => {
		if (todo.ready) return; //  prevents unnecesary executions
		if (todo.times === 0) {
			todo.ready = true;
		} else {
			todo.times--;
		}
	};
</script>

<span>{todo.times}</span>
<button
	onclick={finishTodo}
	class:line-through={todo.ready}
>
	{todo.title}
</button>

<style>
	.line-through {
		text-decoration: line-through;
	}
</style>
```
Note: after minimizing, it clearly shows that the problem has nothing to do with neither snippets nor classes.  
The debugging step is left as an exercise for the readers.  
[Solution](https://svelte.dev/playground/37d81f1b77ec4958a5ab83a7f1a1b017?version=5.18.0)

### Problem 2 - Missing pieces, wild guesses
Source: [$state() in place of writable](https://discord.com/channels/457912077277855764/1328988490318483499)  

(You can go there for more context, there's no spoiler)  

No REPL was provided so I'm creating one: [Original REPL](https://svelte.dev/playground/453ff80c78204f7b8ac23810c4b7cae0?version=5.19.0).  
This is an example of an incomplete or unreproducible problem. The OP only stated vaguely 'ui is not changing accordingly'. He was asked to clarify then provided more info:

> i am changing currStep and on handlBack it should reflect currStep is decrement by 1

 Still unclear where and how he's changing it. Looking at the code structure, it seems to be intended for the [`render`](https://svelte.dev/docs/svelte/imperative-component-api#render) API. However, this will involve a server and I cannot guess how the OP wants to use it. For the sake of this demonstration, I'm taking a leap and add something to recreate the problem in a slightly different way which still preserves the spirit of the original. In `App.svelte` I add:

```html
<script>
	import store, { Default } from './not-sure-what-this-is.js'
</script>

<store.component {...Default.args} />
```

here I render the `store.component`, which is just the `Stepper` component in disguised, with the props spread from `Default.args`. Now it shows the `Create Account` label on the output:  
[REPL](https://svelte.dev/playground/45dd4436aa464ffa8bd648a41bccc0ed?version=5.19.0)

We can start the simplification process. The OP mentioned that he wanted `currStep` to update on calling `handleBack`, so everything can be replaced with a `back` button. This is what the component looks like after being simplified:

```html
<script lang="ts">
	interface IStepperProps {
		currStep: number
		handleBack: () => void
	}
	let { currStep, handleBack }: IStepperProps = $props()
</script>
<p>{currStep}</p>
<button onclick={handleBack}>Back</button>
```

Clicking the button does show the alert but doesn't update the `currStep` prop. Problem replicated successfully.  

I'm removing the alert and changing the `handleBack` function a bit to be able to call it and potentially update the UI repeatedly:

```js
export const handleBack = () => currStep.value--
```

After some more simplifications, this is where we are now: [REPL](https://svelte.dev/playground/8d0765bd58d84f02b0d80c728a5ef1eb?version=5.19.0)

Pretty simplified, I would say. However, I'm gonna take one more step and combine all the `stepper.svelte.js` and `not-sure-what-this-is.js` files into `App.svelte`:

```html
<script>
	import Stepper from './Stepper.svelte'
	const currStep = $state({ value: 1 })
	const props = {
		currStep: currStep.value,
		handleBack: () => currStep.value--,
	}
</script>

<Stepper {...props} />
```

[Final REPL](https://svelte.dev/playground/cc4cdc0ee51541b0b6ce6e7fe917cbb0?version=5.19.0)  
I guess now it should be clear what the core problem is: an excercise for the readers!
[Solution](https://svelte.dev/playground/d5638139b5f246399601be2aeeb61ba1?version=5.19.0)

### Problem 3 -  Dealing with 3rd-party libs.
Source: [How to efficiently handle data fetching and state updates in Svelte 5 forms using the stale-while-revalidate approach too](https://github.com/sveltejs/svelte/discussions/15026)

Description (after discussion on Discord):

> using `let form = $state(formPlayer)`, the `form` state won't get later updates from the parent component if server response is delayed.

[Original REPL](https://svelte.dev/playground/60b15b3698634532b30c9dc61bb031a9?version=5.18.0)

This problem is fairly complex. It uses two 3rd-party libraries: `@tanstack/svelte-query` and `graphql`. Again it is incomplete. Details from `$lib/graphql` and `../players` are missing, so it isn't reproducible out of the box. However, you will see they can be replaced by some basic functions.

I'm gonna simplify the `Form.svelte` component first. I see there's an input to edit `form.player.defaultCoachId` and I will use it as the representative of the form. I also will add a `submit` button. I'm not gonna deal with all the `Tax` and the `cards` related stuff and delete all of them. The `PlayerForm` type isn't provided, but I will replace that. Now the form is fairly minimal with no 3rd-party dependencies:

```html
<script lang="ts" module>
	//exporting for reuse in parent
	export type PlayerForm = {
		player: {
			defaultCoachId: string
		}
	}
	type Submit = (form: PlayerForm) => void
	type Props = {
		formPlayer: PlayerForm
		submit: Submit
	}
</script>
<script lang="ts">
	let { formPlayer, submit }: Props = $props()

	let form = $state(formPlayer)
</script>

<input bind:value="{form.player.defaultCoachId}" />
<button onclick="{()" ="">submit(form)}>Submit</button>
```

Now let's work on the parent `+page.svelte`. To make the `formPlayer` variable we need 2 information: `defaultCoachId` derived from `settingsResult` and `coachId` derived from `teamsStore`. They're both constructed by the same way: calling the `createQuery` function. Assuming that the solution works for one of them, it will definitely work for the other. So I'm keeping only the `defaultCoachId` related stuff, with some more simplifications:

```js
//replacing createQuery with an in-house getSettings function, implementation details added later
const settingsResult = getSettings()

//making defaultCoachId a direct property of $settingsResult, skipping `data`, `edges.find` and newPlayerFromData stuff

let formPlayer = $derived({
	player: { defaultCoachId: $settingsResult.defaultCoachId },
})
```

We can see that `settingsResult` is a Svelte store, most likely a read-only because to modify the data you have to go through the `createMutation` function. So I'm creating a `3rd-party-lib.svelte` module with 2 functions: `getSettings` and `mutateSettings`:

```html
<script lang="ts" module>
	//using .svelte file and script module as a hack to be able to use typescript
	import { readonly, writable } from 'svelte/store'

	//not exposing the writable
	const settings = writable({
		defaultCoachId: 'foo',
	})
	//replaces createQuery
	export function getSettings() {
		return readonly(settings)
	}
	//replaces createMutation
	export function mutateSettings(defaultCoachId: string) {
		settings.set({ defaultCoachId })
	}
</script>
```

The `submit` function is supposed to be an api call that mutates the settings, so let's replace the original with:

```js
    function submit(form: PlayerForm) {
        mutateSettings(form.player.defaultCoachId);
    }
```

We're here now: [REPL](https://svelte.dev/playground/114771a2e83d451ca7f59997d5c0ea33?version=5.18.0).

Now the input and the `submit` function work just fine. It's not clear what's the problem is. To show that, I'm adding something to simulate a late server response in the `getSettings` function. Also adding something to show an error case where the api update call fails:

```js
    //replaces createQuery
    export function getSettings() {
        //simulate a late server response that is different than the in-memory stale value
        setTimeout(()=>{
            settings.set({ defaultCoachId : 'bar' });
        }, 2000)
        //return the in-memory value immediately
        return readonly(settings);
    }
    //replaces createMutation
    export function mutateSettings(defaultCoachId: string) {
        const p = Math.random();
        //simulate an update failure rate of 50% (outrageous!)
        if(p > 0.5){
            settings.set({ defaultCoachId });
        } else {
            console.log('update error!');
        }
    }
```

[Final REPL](https://svelte.dev/playground/ed50485367984006935ab18eb24c174f?version=5.18.0)

It's clear now what the problem is: initially we get the settings and render the form with `defaultCoachId: 'foo'`. 2 seconds later, the server returns a different value: `defaultCoachId: 'bar'` but our form still displays 'foo'. Furthermore, on form submission, the input falsely shows that the value is updated to whatever we typed in, while the server value has a 50% chance of not being updated.

The problem now has no 3rd-party dependencies so it's much more welcoming to all the devs with no knowledge about them. You know the drills: it is now left to the hands of the readers.
