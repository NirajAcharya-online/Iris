import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    loading: true,
  },
  reducers: {
    setUser(state, action) {
      state.userDetails = action.payload;
      state.loading = false;
    },
    clearUser(state, action) {
      state.userDetails = null;
      state.loading = false;
    },
  },
});
export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
