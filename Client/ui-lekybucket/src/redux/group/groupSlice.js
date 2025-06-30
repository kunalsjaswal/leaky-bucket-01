import { createSlice } from "@reduxjs/toolkit"
import { fetchUserGroupsList  } from "./groupThunks"


const initialState = {
  groups: [],
  selectedGroup: null,
  count: 0,
  loading: false 
}

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    selectGroup: (state, action) => {
      state.selectedGroup = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserGroupsList.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUserGroupsList.fulfilled, (state, action) => {
      state.groups = action.payload.groups;
      state.count = action.payload.count;
      state.loading = false;
    })
    .addCase(fetchUserGroupsList.rejected, (state) => {
      state.loading = false;
    })
  }
})

export const {selectGroup } = groupSlice.actions;
export default groupSlice.reducer