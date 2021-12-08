import './firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { collection, setDoc, doc, query, where, getDocs, deleteDoc } from 'firebase/firestore'; 

const auth = getAuth();

const database = getFirestore();


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

// export const writeUserData = async (name, email, uid) => {
//   const newUser = ref(database, `users/${uid}`);
//   try {
//     set(newUser, {
//     name,
//     email,
//   })} catch(err) {
//     console.log(err.message);
//   }
// }

export const writeUserData = async (name, email, uid) => {
  try {
    const docRef = await setDoc(doc(database, 'users', uid), {
      name,
      email
    });
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}


export const createUserAPI = async ({ name, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDisplayName(name);
    await writeUserData(name, email, user.uid);
    return {
      email: user.email,
      name: user.displayName,
      uid: user.uid
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
      name: user.displayName,
      uid: user.uid,
    };
  } catch (error) {
    throw new Error(error.message)
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

export const addEntryAPI = async ({
    gratitudeList,
    meditation,
    goals,
    selflove,
    selfloveAction,
    loveAboutPeople,
    helpOthers,
    lookingForwardTo,
    date,
    id,
    uid,
  }) => {
  try {
    const docRef = await setDoc(doc(database, 'entries', id), {
      gratitudeList,
      meditation,
      goals,
      selflove,
      selfloveAction,
      loveAboutPeople,
      helpOthers,
      lookingForwardTo,
      date,
      id,
      uid,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchEntriesAPI = async (uid) => {
  if (!uid) return;
  try {
    let entries = [];
    const q = query(collection(database, 'entries'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      entries.push(doc.data());
    });
    return entries;
  } catch(error) {
    console.log(error.message);
  }
} 

export const deleteEntryAPI = async (id) => {
  try {
    await deleteDoc(doc(database, "entries", id));
  } catch(error) {
    throw new Error(error.message);
  }
}
