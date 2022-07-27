# gses-test-task

GSES2 BTC application

# App installation

1. Create `.env` file and copy `.env.example` in it. `.env.example` has valid data for convenient testing.
2. Run `npm install`
3. Run `npm run start`

# Docker

Steps to run app in docker:

1. Create image if you haven't already created one:  
   `docker build -t image-gses-test-task . `
2. Run container:  
   `docker run -dp 3000:3000 -v gses-test-task:/server/data --rm --name container-gses-test-task image-gses-test-task`
3. Stop container when you want to stop app running in docker:  
   `docker stop container-gses-test-task`

# App structure
