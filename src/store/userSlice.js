import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
  },
  reducers: {
    setUser(state, action) {
      state.userDetails = action.payload;
    },
    clearUser(state, action) {
      state.userDetails = null;
    },
  },
});
export default userSlice.reducer;
export const { setUser , clearUser } = userSlice.actions;
