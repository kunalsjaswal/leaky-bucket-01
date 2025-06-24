import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth-token');
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return res.data;
    }
    catch(error) {
      return rejectWithValue('Failed to fetch user details');
    }
  }
)