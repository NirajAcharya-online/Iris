import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { database } from "../firebase/firebaseSetup";
import { collection, getDocs } from "firebase/firestore";
export const fetchCartItems = createAsyncThunk(
  "data/cartItems",
  async (user, thunkApi) => {
    try {
      const querySnapshot = await getDocs(
        collection(database, "users", String(user.uid), "cart"),
      );
      const cartData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return cartData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
const initialState = {
  status: "idle",
  error: null,
  total: {
    subTotal: 0,
    totalPrice: 0,
    taxAmount: 0,
    shippingPrice: 0,
  },
  items: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const exist = state.items.find((i) => i.id === action.payload.id);
      if (exist) {
        exist.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },
    removeFromCart(state, action) {
      const exist = state.items.find((i) => i.id === action.payload.id);
      if (!exist) return;

      if (exist.qty > 1) {
        exist.qty -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      }
    },
    clearItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },
    clearCart(state, action) {
      state.items = [];
    },
    updateTotal(state, action) {
      state.total.shippingPrice = Number(action.payload.shippingPrice);
      state.total.subTotal = Number(action.payload.subTotal);
      state.total.taxAmount = Number(action.payload.taxAmount);
      state.total.totalPrice = Number(action.payload.totalPrice);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        ((state.status = "succeeded"), (state.items = action.payload));
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        ((state.status = "failed"), (state.error = action.payload));
      });
  },
});
export const { addToCart, removeFromCart, updateTotal, clearItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
