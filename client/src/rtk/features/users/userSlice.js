import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAdmin:false,
  userDetails:{
    username: "",
    firstName: "",
    lastName: "",
    sessionTimeout: "",
    permissions: [],
  },
  pages:[],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMongoDbFetchedUser: (state, action) => {
        state.userDetails = action.payload;
    },
    setUserPermissions: (state,action) => {
         state.userDetails.permissions = action.payload;
    },
    setUserRoleAsAdmin: (state) => {
         state.isAdmin = true;
    },
    setUserRoleAsSimpleManager: (state) => {
         state.isAdmin = false;
    },
    setUserNavbarPages: (state) => {
      state.pages = state.isAdmin? ["Users","Movies","Members"]:
        state.userDetails?.permissions?.includes("View Movies")&&state.userDetails.permissions.includes("View Subscriptions")? ["Movies","Members"]:
        state.userDetails?.permissions?.includes("View Movies")? ["Movies"]:
        ["Members"]
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMongoDbFetchedUser, setUserPermissions, setUserRoleAsAdmin, setUserRoleAsSimpleManager, setUserNavbarPages } = userSlice.actions

export default userSlice.reducer