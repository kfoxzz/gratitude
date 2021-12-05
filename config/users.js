import { getDatabase, ref, set, add } from 'firebase/database';
import './firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

const auth = getAuth();

const database = getDatabase();

// onAuthStateChanged(auth, user => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

export const writeUserData = async (name, email, uid) => {
  const newUser = ref(database, `users/${uid}`);
  try {
    set(newUser, {
    name,
    email,
  })} catch(err) {
    console.log(err.message);
  }
}

export const createUserAPI = async ({ name, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDisplayName(name);
    await writeUserData(name, email, auth.currentUser.uid);
    return {
      email: auth.currentUser.email,
      name: auth.currentUser.displayName
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

export const signInUserAPI = async({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    return {
      email: user.email,
      name: user.displayName
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export const setDisplayName = async (displayName) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: displayName
    });
    return displayName;
  } catch (error) {
    throw new Error(error.message);
  }
}