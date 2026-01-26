import {
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  collection,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
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

    const snap = await getDoc(cartRef);

    if (snap.exists()) {
      const currentQty = snap.data().qty || 1;

      await setDoc(
        cartRef,
        { ...product, qty: currentQty + 1 },
        { merge: true },
      );
    } else {
      await setDoc(cartRef, { ...product, qty: 1 });
    }

    return { success: true };
  } catch (error) {
    console.error("Cart Error:", error);
    return { error: true, message: error.message };
  }
}
async function removeFromCartDb(user, product) {
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

    const snap = await getDoc(cartRef);

    if (!snap.exists()) {
      return { error: true, message: "Item not found in cart" };
    }

    const currentQty = snap.data().qty || 1;

    if (currentQty > 1) {
      await updateDoc(cartRef, { qty: currentQty - 1 });
    } else {
      await deleteDoc(cartRef);
    }

    return { success: true };
  } catch (error) {
    return { error: true, message: error.message };
  }
}
async function clearItemFromCartDb(user, product) {
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

    await deleteDoc(cartRef);

    return { success: true };
  } catch (error) {
    return { error: true, message: error.message };
  }
}
async function toggleSaved(user, product) {
  if (!user?.uid || !product?.id)
    return { error: true, message: "Missing User or Product ID" };

  try {
    const savedRef = doc(
      database,
      "users",
      String(user.uid),
      "saved",
      String(product.id),
    );

    const snap = await getDoc(savedRef);

    if (snap.exists()) {
      await deleteDoc(savedRef);
      return { removed: true };
    } else {
      await setDoc(savedRef, product);
      return { added: true };
    }
  } catch (error) {
    console.error("Saved Error:", error);
    return { error: true, message: error.message };
  }
}

export {
  createUserDocument,
  addToCartDb,
  toggleSaved,
  removeFromCartDb,
  clearItemFromCartDb,
};
