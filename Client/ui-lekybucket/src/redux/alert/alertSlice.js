import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  type: null,
  isVisible: false,
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isVisible = true;
    },
    // hideAlert reducer remains for manual close if needed
    hideAlert: (state) => {
      state.message = null;
      state.type = null;
      state.isVisible = false;
    },
  },
});

// Thunk to show alert and auto-hide after 4 seconds
export const showAlertWithTimeout = (payload) => (dispatch) => {
  dispatch(alertSlice.actions.showAlert(payload));
  setTimeout(() => {
    dispatch(alertSlice.actions.hideAlert());
  }, 4000);
};

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;