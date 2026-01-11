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

<!-- auto header -->

https://svelte.dev/playground/45e9e53c9b5b4d0bbaaf7e71acde7893?version=5.45.2#H4sIAAAAAAAAA4WSwW7bMAyGX4VQC8QGnPjuJtl666HoZbtNBepadCxApgSJaVoIevfBTtLUaJIeSX4_KepnFFT3KCrxgMZY2FlvFGSoNKPKRSFabTCI6l8U_OEGbkiI4qi6d24R3tDwkHutA57LN5YYiYOoxDI0XjteS5Kse2c9wwPWStMGWm97mC3KQ3yQz-4kLctPVbwJpJ1DhqbTRnmkzGObp-ix_bXgevNU95gKyZ112G6N-YjlQZEkSVoep8WjPkG5HisBG9aWxqddxHiCXQO_odfhM_iPgvKrAuBrPI0udzpRohCM7ywq9ltMxQW_p-ZMPf9Wu-57hA3yn_30g_QR39BA2p-CFLtON92829fmys71nBCVFHdDm8ZSGLocF4IEK7h13rqQ5SNxosgqhBUo22x7JF40HmvGv_jOT1ZhNpvl0zMbzmHcokKDgwK402EVX7rbeP7V2TAiTy9pXDH-9kgK_elK8zQOmDRdS5r--nMhuNZmp0mJqq1NwPQfjav5NaADAAA

<!-- git diff component -->

https://github.com/MrWangJustToDo/git-diff-view/issues/11
https://github.com/MrWangJustToDo/git-diff-view

https://svelte.dev/playground/hello-world?version=5.45.6#H4sIAAAAAAAAA-1V227bOBD9lQFf7ACq1O1bZctt0GbRAukFjnf7UBYoI45kbqihQNKXQPG_F6Qi2-oGiz4X-yBInjnnzIXjYcdINMhy9g61NrAzVkuYolQe5QVLWKU0OpZ_7Zi_bwMuGFgysC7bNnVb1D7YboXDp-ylIY_kHcvZ3JVWtX7BiXvVtMZ66OCtqqq_Fe6S-PXBSLyiTQMHqKxpgLPXtfLPpKqqZ1uFu6zX5Ww2EqmR0AqPQeJPpXGgT35ih_wnnAK3NOQ8eGzaP6CA75xwH8VCpTGVd6pea1WvPVoooAucUF8OtGlu0cYEGrG_VoQr874mY_HmnrzYjxAO_YenQdPtALyAYgFbo2Rf1BnqmMO1cj6HqfNWUQ0PsMT6at9efP02BHn_H6ztk8xx1Br95c0qh6kVuxx6dAKhXx9Fg69OJi2oPv6MGqFZlzerKNNaU6JzvZQI0R-9EdmBiwmGI_p0-w-WPocllsbKed-JBPoKQr8WszN0MHyMkKFpcIgB18ItsVbOo0X5ZmMtkr8WVOcw1fF1luitMRoFDfWeHfAV1Yowh2nEhREwFWizi-4Zp8Ps-2w8NC_C0PzyyPRJ_D8yv-3IvMXP1jTK4XyJfmNpdd_i_HGOxrzFAh6ANlqfxoq4z7LYOGiMRBjtrNPYyWG5Ff_ad9OJ0TL1bpL0Gy2BCeHuZHiRwGQSnovHeINWqkj5pdhNg2OenRY0zftNm69RyLix51rRHVjUBWfO32t0a0TPGawtVgVna-9bl2fZhtq7Oi1Nkz25ul8_T5-nL7NeITt609I5zuJfqeDM495nvSVbcB9TG6dD8-HiOC-n6Iavw2AOkHCrFN35_ZL-RapSKA-cAAbYao1NiC6FvePs3HM8v6LzdjMW_2JFW3SV0G5sv5Tyi5I1nnMMHa1vtCrvii4crdGYalMfOGULlsTiWR453xLmhdI7RZLlfYgffu0n67QHAAA
