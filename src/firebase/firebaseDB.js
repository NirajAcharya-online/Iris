import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { database } from "./firebaseSetup";

async function createUserDocument(user, extraData) {
  try {
    await setDoc(doc(database, "users", String(user.uid)), {
      username: extraData.username,
      email: user.email,
      createdAt: new Date(),
      role: "user",
    });
  } catch (error) {
    return error;
  }
}

async function addToCartDb(user, product) {
  if (!user?.uid || !product?.id)
    return { error: true, message: "Missing User or Product ID" };

  try {
    const cartRef = doc(
      database,
      "users",
      String(user.uid),
      "cart",
      String(product.id),
    );

    await setDoc(
      cartRef,
      {
        ...product,
      },
      { merge: true },
    );

    return { success: true };
  } catch (error) {
    console.error("Cart Error:", error);
    return { error: true, message: error.message };
  }
}
async function addToSaved(user, product) {
  try {
    const savedRef = doc(
      database,
      "users",
      String(user.uid),
      "saved",
      String(product.id),
    );

    await setDoc(savedRef, product);
    return { success: true };
  } catch (error) {
    return { error: true, message: error.message };
  }
}
export { createUserDocument, addToCartDb, addToSaved };
