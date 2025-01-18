import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { loadEnvFile } from "process";

loadEnvFile();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId
};

export const getFirebaseRef = () => {
  return new Promise<FirebaseApp | null>((resolve) => {
    try {
      const app = initializeApp(firebaseConfig);
      resolve(app);
    } catch (error) {
      resolve(null);
    }
  });
}

export const getFirebaseDbAuthRef = () => {
  return new Promise<Firestore | null>(async (resolve) => {
    try {
      const app = await initializeApp(firebaseConfig);
      if (!app) resolve(null);

      const db  = await getFirestore(app);
      resolve(db);

    } catch (error) {
      resolve(null);
    }
  });
}

export const getFirebaseAuthRef = () => {
  return new Promise<Auth | null>(async (resolve) => {
    try {
      const app = await initializeApp(firebaseConfig);
      if (!app) resolve(null);

      const auth  = await getAuth(app);
      resolve(auth);

    } catch (error) {
      resolve(null);
    }
  });
}