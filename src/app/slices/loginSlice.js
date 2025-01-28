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

      const expirationDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
      const authData = {
        ...action.payload,
        expirationDate,
      };

      localStorage.setItem("taskAuth", JSON.stringify(authData));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;

      localStorage.removeItem("taskAuth");
    },
    initializeAuthState(state) {
      const storedData = JSON.parse(localStorage.getItem("taskAuth"));

      if (storedData) {
        const currentTime = new Date().getTime();

        if (storedData.expirationDate && storedData.expirationDate > currentTime) {
          state.isAuthenticated = true;
          state.user = storedData;
        } else {
          localStorage.removeItem("taskAuth");
        }
      }
    },
  },
});

export const { loginSuccess, logout, initializeAuthState } = loginSlice.actions;
export default loginSlice.reducer;
