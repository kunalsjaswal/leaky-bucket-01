
import { createSlice } from "@reduxjs/toolkit"
import { fetchGroupDetail } from "./chatThunks"

const initialState = {
  selectedObject: null,
  countUsers: 0,
  chats: [],
  loading: false
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchGroupDetail.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchGroupDetail.fulfilled, (state, action) => {
      state.selectedObject = action.payload;
      state.countUsers = action.payload?.groupUsers?.length;
      state.loading = false;
    })
    .addCase(fetchGroupDetail.rejected, (state) => {
      state.countUsers = 0;
      state.loading = false;
    })
  }
})

export default chatSlice.reducer;