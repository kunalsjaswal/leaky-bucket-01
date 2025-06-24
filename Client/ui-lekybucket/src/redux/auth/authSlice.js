import { createSlice } from "@reduxjs/toolkit"
import { fetchUserDetails } from "./authThunks";

const intialState = {
  user: null,
  isAuthenticated: false,
  loading: false
}

const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth-token');
      localStorage.removeItem('userId');
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    })
    .addCase(fetchUserDetails.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    })
  }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;
