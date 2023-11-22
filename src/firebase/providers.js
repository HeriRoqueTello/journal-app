import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
  try {
    
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    // console.log(credentials);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      // user info
      displayName, email, photoURL, uid
    }
  } catch (error) {

    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage
    }
  }
}

export const signInWithEmail = async ({ email, password, displayName }) => {
  try {
    
    const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = result.user;
    await updateProfile(FirebaseAuth.currentUser, { displayName });


    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {
    return { ok: false, errorMessage: error.message }
  }
}

export const loginWithEmail = async ({email, password}) => {
  try {
    
    const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    
    const { uid, displayName, photoURL } = user;

    return {
      ok: true,
      uid, displayName, email, photoURL
    }

  } catch (error) {
    return { ok: false, errorMessage: error.message }
  }
}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
}