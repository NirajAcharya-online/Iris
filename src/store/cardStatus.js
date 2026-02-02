import { createSlice } from "@reduxjs/toolkit";

const cardStatusSlice = createSlice({
  name: "cardStatus",
  initialState: {
    cardStatus: {
      showLogin: false,
      showSignup: false,
    },
  },
  reducers: {
    openLogin(state) {
      state.cardStatus.showLogin = true;
      state.cardStatus.showSignup = false;
    },
    closeLogin(state) {
      state.cardStatus.showLogin = false;
    },

    openSignup(state) {
      state.cardStatus.showSignup = true;
      state.cardStatus.showLogin = false;
    },
    closeSignup(state) {
      state.cardStatus.showSignup = false;
    },

    closeAll(state) {
      state.cardStatus.showLogin = false;
      state.cardStatus.showSignup = false;
    },
  },
});

export const { openLogin, closeLogin, openSignup, closeSignup, closeAll } =
  cardStatusSlice.actions;

export default cardStatusSlice.reducer;
