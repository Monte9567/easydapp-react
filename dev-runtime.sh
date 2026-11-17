#!/bin/bash

rm -rf node_modules/.vite

pnpm remove @jellypack/runtime
pnpm i @jellypack/runtime@file:../jelly-packages-public/jelly-runtime

pnpm run dev
