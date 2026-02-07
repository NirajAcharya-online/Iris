import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { database, firebaseAuth } from "./firebaseSetup";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";

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
    return { error: true, message: error.message };
  }
}
async function placeOrderDb(user, orderDetails) {
  if (!user?.uid || !orderDetails?.items?.length) {
    return { error: true, message: "Missing User ID or Order Items" };
  }

  try {
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const orderRef = doc(database, "orders", orderId);

    const finalOrder = {
      user: String(user.uid),
      orderId: orderId,
      items: orderDetails.items,
      summary: orderDetails.total,
      shippingInfo: orderDetails.data,
      status: "Processing",
      createdAt: serverTimestamp(),
      paymentMethod: orderDetails.paymentMethod,
    };

    await setDoc(orderRef, finalOrder);

    return { success: true, orderId: orderId };
  } catch (error) {
    console.error("Order Storage Error:", error);
    return { error: true, message: error };
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
async function clearEntireCartDb(user) {
  if (!user?.uid) return { error: true, message: "Missing User ID" };

  try {
    const cartRef = collection(database, "users", String(user.uid), "cart");

    const snapshot = await getDocs(cartRef);

    if (snapshot.empty) {
      return { success: true, message: "Cart is already empty" };
    }

    const batch = writeBatch(database);

    snapshot.docs.forEach((item) => {
      batch.delete(item.ref);
    });

    await batch.commit();

    return { success: true };
  } catch (error) {
    console.error("Clear cart error:", error);
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

async function deleteUserDb(user) {
  try {
    const docRef = doc(database, "users", String(user.uid));
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    return { error: true, message: error.message };
  }
}
async function updateUserName(newUserName) {
  try {
    await updateProfile(firebaseAuth.currentUser, {
      displayName: newUserName,
    });
    await firebaseAuth.currentUser.reload();
    return { success: true, user: firebaseAuth.currentUser };
  } catch (error) {
    return { error: true, message: error.message };
  }
}
export {
  createUserDocument,
  addToCartDb,
  toggleSaved,
  removeFromCartDb,
  clearItemFromCartDb,
  placeOrderDb,
  clearEntireCartDb,
  deleteUserDb,
  updateUserName,
};
