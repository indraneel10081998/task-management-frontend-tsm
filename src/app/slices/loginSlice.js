import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    token: null,
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("userAuth", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("userAuth");
    },
    initializeAuthState(state) {
      const user = JSON.parse(localStorage.getItem("userAuth"));
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
      }
    },
    updateToken(state, action) {
      state.user.token = action.payload.token;
      localStorage.setItem('userAuth', JSON.stringify(state.user));
    },
  },
});

export const { loginSuccess, logout, initializeAuthState, updateToken } = loginSlice.actions;
export default loginSlice.reducer;
