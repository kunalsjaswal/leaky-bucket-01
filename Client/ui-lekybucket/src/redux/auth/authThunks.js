import { createAsyncThunk } from '@reduxjs/toolkit';
import { showAlertWithTimeout } from '../alert/alertSlice';
import axiosInstance from '../../utils/axiosInstance';


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const { email, password } = credentials;

      const res = await axiosInstance.post(`/auth/login`, {
        email,
        password
      })

      dispatch(showAlertWithTimeout({
        message: 'Login successful',
        type: "success",
        isVisible: true
      }));

      return res.data.data;
    }
    catch (error) {
      dispatch(showAlertWithTimeout({
        message: error.response?.data?.message || 'Login failed',
        type: "error",
        isVisible: true
      }));

      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
)

export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    try {

      const res = await axiosInstance.get(`/users/${userId}`, {});
      
      return res.data.data;
    }
    catch(error) {
      return rejectWithValue('Failed to fetch user details');
    }
  }
)

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const { name, email, password } = userData;

      const res = await axiosInstance.post(`/users`, {
        name,
        email,
        password
      });

      dispatch(showAlertWithTimeout({
        message: "Signup successful! Please log in.",
        type: "success",
        isVisible: true
      }));


      return res.data.data;
    } catch (error) {
      dispatch(showAlertWithTimeout({
        message: error.response?.data?.message || 'Signup failed',
        type: "error",
        isVisible: true
      }));

      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
)