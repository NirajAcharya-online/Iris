import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};
const wishlistSlicer = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toogleWishlist(state, action) {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        state.items.push(action.payload);
      }
    },
  },
});
export const { toogleWishlist } = wishlistSlicer.actions;
export default wishlistSlicer.reducer;
