import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "./firebaseSetup";
import { createUserDocument } from "./firebaseDB";

async function createAccount(data) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      data.email,
      data.password,
    );
    const user = userCredential.user;
    await updateProfile(userCredential.user, {
      displayName: data.username,
    });

    await createUserDocument(user, data);
    return userCredential;
  } catch (error) {
    let errorMessage = "Failed to create account. Please try again.";

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "This email is already registered. Try logging in.";
        break;
      case "auth/invalid-email":
        errorMessage = "The email address is not valid.";
        break;
      case "auth/operation-not-allowed":
        errorMessage =
          "Email/Password accounts are not enabled in the dashboard.";
        break;
      case "auth/weak-password":
        errorMessage = "The password is too weak. Use at least 6 characters.";
        break;
      default:
        console.error("Signup Error:", error.message);
    }
    return { error: true, message: errorMessage };
  }
}
async function loginUser(data) {
  try {
    const response = await signInWithEmailAndPassword(
      firebaseAuth,
      data.email,
      data.password,
    );
    return response;
  } catch (error) {
    let errorMessage = "An unknown error occurred. Please try again.";

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "The email address is not valid.";
        break;
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        errorMessage = "Invalid email or password. Please try again.";
        break;
      case "auth/user-disabled":
        errorMessage = "This account has been disabled.";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many failed attempts. Please try again later.";
        break;
    }
    return { error: true, message: errorMessage };
  }
}
async function logout() {
  try {
    const response = await signOut(firebaseAuth);
    return response;
  } catch (error) {
    return error;
  }
}
export { createAccount, loginUser, logout };
