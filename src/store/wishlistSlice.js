import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase/firebaseSetup";
const fetchSavedItems = createAsyncThunk(
  "saved/fetchSavedItems",
  async (user, thunkApi) => {
    try {
      if (!user?.uid) throw new Error("No user");

      const querySnapshot = await getDocs(
        collection(database, "users", String(user.uid), "saved"),
      );

      const savedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return savedData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    clearSaved(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSavedItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSavedItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSaved } = savedSlice.actions;
export default savedSlice.reducer;
