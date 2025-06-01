docker build -t diagnobot-app -f docker/Dockerfile .

docker run -p 8000:8000 -p 5173:5173 diagnobot-app
