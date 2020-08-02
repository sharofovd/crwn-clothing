import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBjbPtRAiYRaKkZ3tF9Y83NDerb3NpY65Q",
  authDomain: "crwn-db-84424.firebaseapp.com",
  databaseURL: "https://crwn-db-84424.firebaseio.com",
  projectId: "crwn-db-84424",
  storageBucket: "crwn-db-84424.appspot.com",
  messagingSenderId: "1023373578155",
  appId: "1:1023373578155:web:146570fae91c28696a0cee",
  measurementId: "G-FX0KVDGTRB"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
