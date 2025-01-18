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
- Start Docker container
```sh
docker run -it --rm \
    --name todoapp \
    -p 3000:3000 \
    -v ./:/app \
    -w /app \
    node:23 \
        /bin/bash
```

- Install dependencies and start in dev mode
```sh
npm install

npm run dev
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