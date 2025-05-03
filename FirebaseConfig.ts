import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
 import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
// import {...} from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// import {...} from 'firebase/functions';
 import {getStorage} from 'firebase/storage';
 import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyACxLjmsA4iM0MuPALaKHkKeQTq3dIxsvs',
  authDomain: 'wvote-ce6f4.firebaseapp.com',
  databaseURL: 'https://wvote-ce6f4.firebaseio.com',
  projectId: 'wvote-ce6f4',
  storageBucket: 'wvote-ce6f4.firebasestorage.app',
  messagingSenderId: '169615202545',
  appId: '1:169615202545:web:e7a299deb3bec74192b150',
  measurementId: 'G-1ZRCP33FHJ',
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
