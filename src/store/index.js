import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import userReducer from "./userSlice";
import cardReducer from "./cardStatus";
import orderReducer from "./orderSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    cardStatus: cardReducer,
    order: orderReducer,
  },
});

export default store;
