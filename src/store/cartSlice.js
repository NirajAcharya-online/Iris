import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
      state.items === state.items.filter((i) => i.id !== action.payload.id);
    },
    clearCart(state, action) {
      state.items = [];
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
