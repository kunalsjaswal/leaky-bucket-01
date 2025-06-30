import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchGroupDetail = createAsyncThunk(
  'group/getGroupDetail',
  async(groupId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/group/${groupId}`);

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to group Details');
    }
  }
)
