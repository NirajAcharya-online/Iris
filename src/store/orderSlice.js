import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { database } from "../firebase/firebaseSetup";
import { collection, getDocs, query, where } from "firebase/firestore";
export const fetchOrders = createAsyncThunk(
  "data/orders",
  async (user, thunkApi) => {
    if (!user?.uid) return thunkApi.rejectWithValue("No User ID provided");

    try {
      // 1. Reference the ROOT "orders" collection
      const ordersRef = collection(database, "orders");

      // 2. Query where the field "user" matches the "user.uid"
      // Note: Make sure the field in Firestore is named exactly "user"
      const q = query(ordersRef, where("user", "==", user.uid));

      const querySnapshot = await getDocs(q);

      const ordersData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          // Using your existing logic for mapping
          createdAt: data.createdAt?.toMillis?.() || Date.now(),
          items:
            data.items?.map((item) => ({
              ...item,
              price: item.price ?? 0,
              qty: item.qty ?? 1,
            })) || [],
        };
      });

      return ordersData.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },
);
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    status: "idle",
    error: null,
    orderList: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        ((state.status = "succeeded"), (state.orderList = action.payload));
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        ((state.status = "failed"), (state.error = action.payload));
      });
  },
});
export default orderSlice.reducer;
