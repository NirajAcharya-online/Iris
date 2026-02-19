import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {
    uid: null,
    email: null,
    username: null,
    isVerified: null,
    createdAt: null,
    role: "user",
  },
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userDetails = action.payload;
      state.loading = false;
    },
    clearUser(state) {
      Object.assign(state, initialState);
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
