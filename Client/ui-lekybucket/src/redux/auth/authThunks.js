import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showAlertWithTimeout } from '../alert/alertSlice';
import axiosInstance from '../../utils/axiosInstance';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const { email, password } = credentials;

      const res = await axios.post(`${baseUrl}/auth/login`, {
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
      const token = localStorage.getItem('auth-token');

      const res = await axiosInstance.get(`/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
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

      const res = await axios.post(`${baseUrl}/users`, {
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