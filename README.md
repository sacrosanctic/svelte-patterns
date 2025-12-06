# WIP

## Create a sveltekit template

```bash
pnpm dlx sv create . --template minimal  --no-add-ons --types ts --no-install
pnpm dlx sv add tailwindcss --tailwindcss none --no-install
pnpm i
pnpm dlx shadcn-svelte@next init
pnpm dlx shadcn-svelte@next add button -y -o
pnpm check
```

## create a output.json

```bash
pnpm dlx jiti ./test.js ./template
```

## Excalidraw to svg

```bash
pnpm dlx excalidraw-brute-export-cli \
  -i ./what-is-full-stack.excalidraw \
  --background 0 \
  --embed-scene 0 \
  --dark-mode 0 \
  --scale 1 \
  --format svg \
  -o "./what-is-full-stack.svg"
```

## Working list of tags

### meta categories

- pattern
- faq (frequently asked question)

### area of code

- form
- kit
- router
- svelte-5
- meta (metaprogramming / scripting)
- css
- tailwind

# blog sites to reference

https://github.com/StephenGunn/jovian

# when migrating to sveltekit

https://svelte.dev/playground/45e9e53c9b5b4d0bbaaf7e71acde7893?version=5.45.2#H4sIAAAAAAAAA4WSwW7bMAyGX4VQC8QGnPjuJtl666HoZbtNBepadCxApgSJaVoIevfBTtLUaJIeSX4_KepnFFT3KCrxgMZY2FlvFGSoNKPKRSFabTCI6l8U_OEGbkiI4qi6d24R3tDwkHutA57LN5YYiYOoxDI0XjteS5Kse2c9wwPWStMGWm97mC3KQ3yQz-4kLctPVbwJpJ1DhqbTRnmkzGObp-ix_bXgevNU95gKyZ112G6N-YjlQZEkSVoep8WjPkG5HisBG9aWxqddxHiCXQO_odfhM_iPgvKrAuBrPI0udzpRohCM7ywq9ltMxQW_p-ZMPf9Wu-57hA3yn_30g_QR39BA2p-CFLtON92829fmys71nBCVFHdDm8ZSGLocF4IEK7h13rqQ5SNxosgqhBUo22x7JF40HmvGv_jOT1ZhNpvl0zMbzmHcokKDgwK402EVX7rbeP7V2TAiTy9pXDH-9kgK_elK8zQOmDRdS5r--nMhuNZmp0mJqq1NwPQfjav5NaADAAA
