# Goal
Learn react-next-firebase tech stack by building a TODO app.
(Following YT Tutorial by `Code Hackery` + some others on nextjs - server-actions, authentication, etc.)

# Tech Stack
- React JS
- Next JS
- Firebase

## Pre-Requisites
- Docker

# Secrets
- Firebase credentials need to be setup as environment variables in `.env` file
(although Firebase suggests they can be kept on client side)
```sh
FIREBASE_apiKey=
FIREBASE_authDomain=
FIREBASE_projectId=
FIREBASE_storageBucket=
FIREBASE_messagingSenderId=
FIREBASE_appId=
```

# Dev Environment Setup

## First Run
```sh
# START node image
docker run -it --rm \
    --name todoapp_server \
    -p 3000:3000 \
    -p 9005:9005 \
    -v ./:/app \
    -w /app \
    node:23 \
        /bin/bash

npx create-next-app@14.2.23 _server --tailwind --typescript

npm run dev

docker commit todoapp_server todoapp_server_image
```

## Subsequent Runs
```sh
docker run -it --rm \
    --name todoapp_server \
    -p 3000:3000 \
    -p 9005:9005 \
    -v ./:/app \
    -w /app \
    todoapp_server_image \
        /bin/bash

docker exec -it todoapp_server /bin/bash
```

# Deployment

```sh
docker build -t todoapp_server_image .

docker run -d \
    --name todoapp_server \
    -p 3000:3000 \
    todoapp_server_image
```

- UI
- Firebase Authentication
- Firebase DB (Firestore) - Client Side
- Firebase DB (Firestore) - Server Side