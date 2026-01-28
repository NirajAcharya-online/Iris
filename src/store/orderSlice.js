import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { database } from "../firebase/firebaseSetup";
import { collection, getDocs } from "firebase/firestore";
export const fetchOrders = createAsyncThunk(
  "data/orders",
  async (user, thunkApi) => {
    if (!user?.uid) return thunkApi.rejectWithValue("No User ID provided");

    try {
      const querySnapshot = await getDocs(
        collection(database, "users", String(user.uid), "orders"),
      );

      const ordersData = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          ...data,
          id: doc.id,
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
      return thunkApi.rejectWithValue(error.message);
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
