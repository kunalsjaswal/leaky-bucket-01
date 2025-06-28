import { createSlice } from "@reduxjs/toolkit"
import { fetchUserDetails, loginUser, signupUser } from "./authThunks";


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

      // Add loginUser async thunk cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;

        localStorage.setItem('auth-token', action.payload.accessToken);
        document.cookie = `refreshToken=${action.payload.refreshToken}; path=/; secure; samesite=strict`;
        localStorage.setItem('userId', action.payload.user.id);

        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })

      // add signupUser async thunk cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
          
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
      });
  }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;
