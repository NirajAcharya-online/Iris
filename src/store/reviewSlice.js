import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../firebase/firebaseSetup";

export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const docRef = doc(database, "reviews", String(productId));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().entries || [];
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    productReviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    addReviewToState: (state, action) => {
      state.productReviews.unshift(action.payload);
    },
    clearReviews: (state) => {
      state.productReviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;

        state.productReviews = action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addReviewToState, clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
