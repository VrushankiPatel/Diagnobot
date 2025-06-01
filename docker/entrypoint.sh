#!/bin/bash

(cd /app/backend && python3 -m app.__init__) & (cd /app/frontend && npm run dev -- --host 0.0.0.0) & wait
