import { combineReducers } from "@reduxjs/toolkit";
import authReducer, { logout } from './auth/authSlice'
import alertReducer from './alert/alertSlice'
import usersReducer from './users/usersSlice'
import groupReducer from './group/groupSlice'

const appReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  users: usersReducer,
  group: groupReducer,
})

const rootReducer = (state, action) => {
  if(action.type === logout.type){
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;