import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAlTdqgAhCIwJ0ddrPaypPld5IOccGslUU",
  authDomain: "claster-a6903.firebaseapp.com",
  databaseURL: "https://claster-a6903-default-rtdb.firebaseio.com",
  projectId: "claster-a6903",
  storageBucket: "claster-a6903.firebasestorage.app",
  messagingSenderId: "48346223153",
  appId: "1:48346223153:web:df7aa6199c48aacbab7b10"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider()