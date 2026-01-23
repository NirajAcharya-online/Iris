import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
});
export const { addToCart, removeFromCart, updateTotal, clearItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
