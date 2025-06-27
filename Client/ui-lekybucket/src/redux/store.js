
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import alertReducer from './alert/alertSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer
  }
})