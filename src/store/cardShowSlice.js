import { createSlice } from "@reduxjs/toolkit";

const cardStatusSlice = createSlice({
  name: "cardStatus",
  initialState: {
    cardStatus: {
      showLogin: false,
      showSignup: true,
    },
  },
  reducers: {
    toogleLogin(state, action) {
      if (state.cardStatus.showLogin) {
        state.cardStatus.showLogin = false;
      } else {
        state.cardStatus.showLogin = true;
      }
    },
    toogleSignup(state, action) {
      if (state.cardStatus.showSignup) {
        state.cardStatus.showSignup = false;
      } else {
        state.cardStatus.showSignup = true;
      }
    },
  },
});
export default cardStatusSlice.reducer;
export const { toogleLogin, toogleSignup } = cardStatusSlice.actions;
