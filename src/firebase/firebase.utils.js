import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBJFmA1imtqQ2LtmYDtScUyQ717vWxdRZY",
    authDomain: "crwb-db-7e355.firebaseapp.com",
    databaseURL: "https://crwb-db-7e355.firebaseio.com",
    projectId: "crwb-db-7e355",
    storageBucket: "crwb-db-7e355.appspot.com",
    messagingSenderId: "226104593424",
    appId: "1:226104593424:web:81018856428fc2465fce95",
    measurementId: "G-ZYVM60516X"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return 

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    
    if(!snapshot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (err) {
        console.log('Error creating user', err);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore =firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;


