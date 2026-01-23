import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseSetup";

async function createAccount(data) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );

    await updateProfile(userCredential.user, {
      displayName: data.username,
    });
    return userCredential;
  } catch (error) {
    if (error.message.includes("email-already-in-use")) {
      return "This email is already registered.";
    } else {
      ("Failed to create account. Try again.");
    }
  }
}
async function loginUser(data) {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );
    return response;
  } catch (error) {
    return error;
  }
}
async function logout() {
  try {
    const response = await signOut(auth);
    return response;
  } catch (error) {
    return error;
  }
}
export { createAccount, loginUser, logout };
