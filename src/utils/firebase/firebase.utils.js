import { initializeApp } from 'firebase/app';
import { 
        getAuth, 
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
    } from "firebase/auth";

import { getFirestore, 
         doc, 
         getDoc, 
         setDoc,
         collection,
         writeBatch,
         query,
         getDocs,
        } from "firebase/firestore";

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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((obj) => {
        const docRef = doc(collectionRef, obj.title.toLowerCase());
        batch.set(docRef, obj);
    });

    await batch.commit();
    console.log("Batch commit successful");

}

export const getCategoriesAndDocuments = async () => {
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data()); 
}


export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
  if (!userAuth) return;
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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  
return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => await signOut(auth);

export const onAuthStateChangedHandler = (callback) => 
  onAuthStateChanged(auth, callback);