import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";


export const fetchUserGroupsList = createAsyncThunk(
  'group/getGroupsList',
  async(userId, { rejectWithValue }) => {
    try {

      const res = await axiosInstance.get(`/group/user/${userId}`);

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch groups');
    }
  }
)