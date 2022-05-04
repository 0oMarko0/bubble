import firebase from 'firebase/compat';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import FirebaseError = firebase.FirebaseError;

const env = import.meta.env;

const firebaseApp = firebase.initializeApp({
    apiKey: env.VITE_API_KEY,
    authDomain: env.VITE_AUTH_DOMAIN,
    projectId: env.VITE_PROJECT_ID,
    storageBucket: env.VITE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
    appId: env.VITE_APP_ID,
    measurementId: env.VITE_MEASUREMENT_ID,
});

export const errorDescription = (error: FirebaseError) => error.code.split('/')[1];
export const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, 'http://localhost:9099');
