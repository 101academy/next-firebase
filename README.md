# Goal
Learn react-next-firebase tech stack by building a TODO app.
(Following YT Tutorial by `Code Hackery`)

# Tech Stack
- React JS
- Next JS
- Firebase

## Pre-Requisites
- Docker

# Secrets
- Add your Firebase credentials in `src/lib/firebase.ts` file

# Dev Environment Setup

## First Run
```sh
# START node image
docker run -it --rm \
    --name todoapp \
    -p 3000:3000 \
    -p 9005:9005 \
    -v ./:/app \
    -w /app \
    node:23 \
        /bin/bash

npx create-next-app@14.2.23 todoapp --tailwind --typescript

npm run dev

docker commit todoapp todoapp_image
```

## Subsequent Runs
```sh
docker run -it --rm \
    --name todoapp \
    -p 3000:3000 \
    -p 9005:9005 \
    -v ./:/app \
    -w /app \
    todoapp_image \
        /bin/bash

docker exec -it todoapp /bin/bash
```

# Deployment

```sh
docker build -t todoapp_image .

docker run -d \
    --name todoapp \
    -p 3000:3000 \
    todoapp_image
```

- UI
- Firebase Authentication
- Firebase DB (Firestore) - Client Side
- Firebase DB (Firestore) - Server Side