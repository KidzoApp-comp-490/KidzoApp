import { auth } from "../Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider,
  signOut,
  getAuth,
} from "firebase/auth";

// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }
  // Do other things
});
async function register(email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
}
async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

async function SignOut() {
  return signOut(auth)
    .then(() => {})
    .catch((error) => {});
}

async function forgetPass(email) {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

async function getUserUId() {
  if (auth.currentUser != null) {
    console.log("here", auth.currentUser.uid);
    return auth.currentUser.uid;
  } else {
    return null;
  }
}

export { register, login, SignOut, getUserUId, forgetPass };
