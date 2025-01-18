import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_apiKey_GOES_HERE',
  authDomain: 'YOUR_FIREBASE_authDomain_GOES_HERE',
  projectId: 'YOUR_FIREBASE_projectId_GOES_HERE',
  storageBucket: 'YOUR_FIREBASE_storageBucket_GOES_HERE',
  messagingSenderId: 'YOUR_FIREBASE_messagingSenderId_GOES_HERE',
  appId: 'YOUR_FIREBASE_appId_GOES_HERE'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth  = getAuth(app);
const analytics = app.name && typeof window != 'undefined' ? getAnalytics(app): null;
const db = getFirestore(app);

export {app, auth, analytics, db}