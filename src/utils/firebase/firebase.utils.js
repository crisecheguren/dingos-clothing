import { initializeApp } from 'firebase/app';
import { 
        getAuth, 
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
    } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCFq3KQ2QhEn8xpSORXOdevmBVa7t-d6I4",
    authDomain: "dingos-clothing.firebaseapp.com",
    projectId: "dingos-clothing",
    storageBucket: "dingos-clothing.appspot.com",
    messagingSenderId: "242208921417",
    appId: "1:242208921417:web:cb60e8e65445c88bc8ac98",
    measurementId: "G-HWX25B4RJ1"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);


  // check if user data exists in db
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  
return userDocRef;

};

