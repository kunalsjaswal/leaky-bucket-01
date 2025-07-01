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
    },
    searchUserNotInGroup: (state, action) => {
      const userData = action.payload.userData;
      const grpUsers = action.payload.groupUsers;
      const key = action.payload.key;

      const searchUsers = userData?.filter(user => grpUsers.some(grpUser => grpUser.id === user.id))
      const result = searchUsers?.filter(user => (user.name.includes(key) || user.email.includes(key)))

      return result;
    },
    addUserToGroup: () => {

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

export const {selectGroup, searchUserNotInGroup } = groupSlice.actions;
export default groupSlice.reducer