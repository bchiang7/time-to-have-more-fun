import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'time-to-have-more-fun.firebaseapp.com',
  databaseURL: 'https://time-to-have-more-fun.firebaseio.com',
  projectId: 'time-to-have-more-fun',
  storageBucket: 'time-to-have-more-fun.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const snapshotToArray = querySnapshot => querySnapshot.docs.map(doc => doc.data());

export { db, snapshotToArray };
