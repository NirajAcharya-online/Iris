import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../firebase/firebaseSetup";

async function addProduct(product) {
  const productID = { ...product, createdAt: Date.now() };
  try {
    const productRef = doc(database, "products", String(product.id));
    setDoc(productRef, productID);
    return { success: true };
  } catch (error) {
    console.error("Cart Error:", error);
    return { error: true, message: error.message };
  }
}
export { addProduct };
