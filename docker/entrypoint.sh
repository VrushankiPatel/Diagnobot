#!/bin/bash

# Start FastAPI backend
cd /app/backend
python3 -m app &
BACKEND_PID=$!

# Start React frontend with Tailwind (Vite dev server)
cd /app/frontend
npm run dev -- --host 0.0.0.0 &
FRONTEND_PID=$!

# Wait for both to exit
wait $BACKEND_PID $FRONTEND_PID
