#!/bin/bash

npx tsc -b && npx vite build -c vite.frontend.config.ts && wrangler pages deploy --project-name easydapp-mock ./dist
