---
title: How To Setup Firebase Cloud Messaging
publish: false
tags: firebase, fcm, messaging
---

<!-- ## Describe the problem -->

## Solution

:::code-group

```js [src/service-worker.js]

/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope

import { initializeApp } from 'firebase/app'
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'


// get config
// https://console.firebase.google.com/u/0/project/_/settings/general/
const firebaseConfig = { /* ... */ }
const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

onBackgroundMessage(messaging, (payload) => {
	if (!payload.notification || !payload.notification.title) return

	sw.registration.showNotification(payload.notification.title, {
		body: payload.notification.body,
		icon: payload.notification.icon,
	})
})

```

```ts [firebase.ts]
import { getApp, getApps, initializeApp } from 'firebase/app'
import { arrayUnion, doc, getFirestore, setDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getMessaging, getToken, onMessage, type Messaging } from 'firebase/messaging'
import { browser, dev } from '$app/environment'
import toast from 'svelte-french-toast'

export const initMessaging = () => {
	// because i dont want the top level fn to be async
	const getToken2 = async (messaging: Messaging) => {
		// sveltekit only compiles 1 service worker named `service-worker.js` while firebase expects `firebase-messaging-sw.js`.
		// use custom registration to override firebase default
		const registration = await navigator.serviceWorker.register('/service-worker.js', {
			type: dev ? 'module' : 'classic',
		})

		const token = await getToken(messaging, {
			serviceWorkerRegistration: registration,
			// get key
			// https://console.firebase.google.com/u/0/project/_/settings/cloudmessaging
			vapidKey: '',
		})
		return token
	}

	const messaging = getMessaging(app)

	if (browser) {
		getToken2(messaging).then((token) => {
			if (token) setDoc(doc(db, 'asdf', 'asdf'), { key: arrayUnion(token) }, { merge: true })
		})

		onMessage(messaging, (payload) => {
			if (payload.notification?.body) toast.success(payload.notification.body)
		})
	}
	return messaging
}
```

```ts [src/routes/+layout.svelte]
<script lang="ts">
	import { onMount } from 'svelte'
	import { initMessaging } from './firebase'
	import { Toaster } from 'svelte-french-toast'

	const onclick = () => {
		console.log('Requesting permission...')
		Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				console.log('Notification permission granted.')
			}
		})

		initMessaging()
	}

	onMount(() => {
		onclick()
	})
</script>

<Toaster />

<button {onclick}>request perm</button>
```

```ts [+page.server.ts]
const firebaseAdminInit = () => {
	const parseConfig = (config: string): admin.ServiceAccount => {
		const { project_id, private_key, client_email } = JSON.parse(config)

		return {
			projectId: project_id,
			privateKey: private_key,
			clientEmail: client_email,
		}
	}

	const serviceAccount = parseConfig(serviceAccountConfig)

	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`,
			storageBucket: `${serviceAccount.projectId}.appspot.com`,
		})
		admin.firestore().settings({
			ignoreUndefinedProperties: true,
		})
	}
}

firebaseAdminInit()

export const actions = {
	join: async () => {
		try {
			const ref = admin.firestore().collection('asdf').doc('asdf')
			const doc = await ref.get()
			const tokens = (doc.data()?.key ?? []) as string[]

			if (!tokens.length) return

			const promises = await admin.messaging().sendEachForMulticast({
				tokens,
				notification: { body: 'yo', title: 'ho' },
			})

			const invalidTokens = promises.responses
				.map((_, i) => ({ ..._, id: i }))
				.filter((_) => !_.success)
				.map((_) => tokens[_.id])

			if (invalidTokens) ref.update({ key: admin.firestore.FieldValue.arrayRemove(...invalidTokens) })
		} catch (e) {
			console.error('error', e)
		}
	},
}
```

:::

## Reference
