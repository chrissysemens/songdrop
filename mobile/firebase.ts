import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
} from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

console.log(firebaseConfig);

const firebase = initializeApp(firebaseConfig);

const db = initializeFirestore(firebase, {}, 'song-drop');

let analytics = {};

isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics();
  } else {
    console.log("Firebase Analytics is not supported in this environment.");
  }
});

export { firebase, db, analytics };
