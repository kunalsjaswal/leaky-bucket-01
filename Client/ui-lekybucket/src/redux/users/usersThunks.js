import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axiosInstance'

export const fetchUsersList = createAsyncThunk(
  'users/fetchUsersList',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/users`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users list');
    }
  }
)
