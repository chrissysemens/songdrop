import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
} from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

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
