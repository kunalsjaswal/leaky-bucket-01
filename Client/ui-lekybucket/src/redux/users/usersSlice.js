import { createSlice } from "@reduxjs/toolkit"
import { fetchUsersList } from "./usersThunks"


const initialState = {
  users: [],
  count: 0,
  loading: false
}

const usersSlice = createSlice(
  {
    name: "users",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      // adding logic to fetch users list
      builder.addCase(fetchUsersList.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.users = action.payload;
        state.count = action.payload?.length || 0;
        state.loading = false;
      })
      .addCase(fetchUsersList.rejected, (state) => {
        state.loading = false;
      })
    }
  }
)

export default usersSlice.reducer;