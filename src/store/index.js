import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import userReducer from "./userSlice";
import cardReducer from "./cardStatus";
import orderReducer from "./orderSlice";
import { productsApi } from "../data/fetchProducts";
import { adminApi } from "../features/admin/adminApi";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    cardStatus: cardReducer,
    order: orderReducer,

    [productsApi.reducerPath]: productsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, adminApi.middleware),
});

export default store;
