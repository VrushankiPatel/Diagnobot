docker build -t diagnobot-app -f docker/Dockerfile .

docker run --rm -p 8000:8000 -p 5173:5173 --name diagnobot-app --env-file .env diagnobot-app
