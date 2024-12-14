import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userName = action.payload.userName;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userName = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;