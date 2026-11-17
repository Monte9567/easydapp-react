#!/bin/bash

rm -rf node_modules/.vite
# rm -rf node_modules/.pnpm

pnpm remove @easydapp/react
pnpm i @easydapp/react@file:../..

pnpm remove @jellypack/wasm-api
pnpm i @jellypack/wasm-api@file:../../../jelly-packages/jelly-wasm-api

pnpm run build

# pnpm run deploy

# pnpm run dev
