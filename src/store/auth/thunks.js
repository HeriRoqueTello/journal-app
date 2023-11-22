import { deleteDoc, doc } from "firebase/firestore/lite";
import { loginWithEmail, logoutFirebase, signInWithEmail, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"
import { FirebaseDB } from "../../firebase/config";
import { clearNotesLogout, deleteNoteById } from "../journal/journalSlice";

export const checkingAuthentication = () => {
  return async(dispatch) => {
    dispatch(checkingCredentials());
  }
}

export const startGoogleSignIn = () => {
  return async( dispatch ) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));

  }
}

export const startEmailSignIn = ({ email, password, displayName }) => {
  return async( dispatch ) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } = await signInWithEmail({ email, password, displayName });

    if ( !ok ) return dispatch(logout({ errorMessage }))

    dispatch(login({ uid, displayName, email, photoURL }));

  }
}

export const startEmailLogin = ({ email, password }) => {
  return async( dispatch ) => {
    dispatch(checkingCredentials());

    const {ok, uid, displayName, photoURL, errorMessage } = await loginWithEmail({ email, password });
    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }))
  }
}

export const startLogout = () => {
  return async( dispatch ) => {
    await logoutFirebase();

    dispatch( clearNotesLogout() );
    dispatch(logout());
  }
}

export const startDeletingNote = () => {
  return async( dispatch, getState ) => {
    
    const { uid } = getState().auth;
    const { active:note } = getState().journal;
    
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}` );
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  }
}