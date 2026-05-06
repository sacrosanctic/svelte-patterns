---
title: How to preview your app locally
category: faq
tags:
  - debugging
  - gotcha
---

# Describe the problem

While `npm run dev` is a great dev experience in conjunction with `HMR`. I want to preview the app on my machine similar to production environment before I deploy.

<!-- https://discord.com/channels/457912077277855764/1443058650661785712/1443087586217168896 -->

# Do not use

## `npm run preview`

Under the hood, it runs `vite preview`. Even though it is part of the official docs. Its behaviours are not representative of a production server.

# adapter-static

```sh
npm run build
npx http-server build
```

# adapter-node

This also applies to node adjacent runtimes like `bun` and `deno` as well as serverless runtimes like `cloudflare` and `vercel`.

```sh
npm run build
node build
```
