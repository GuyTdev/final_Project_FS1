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
  autoLogoutTime: Date.now()
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
      console.log( " set role admin called");
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
    calculateLogoutTime: (state, action) => {
      // let timezoneOffset = new Date().getTimezoneOffset() * 60000;
      console.log("action.payload session timeout", action.payload);
      let calculatedTime = new Date(Date.now() + action.payload * 60000);//
      console.log("calculatedTime: ",calculatedTime.toISOString().slice(0,-1));
      state.autoLogoutTime = calculatedTime.toString();
    }

  },
})

// Action creators are generated for each case reducer function
export const { setMongoDbFetchedUser, setUserPermissions, setUserRoleAsAdmin, setUserRoleAsSimpleManager, setUserNavbarPages, calculateLogoutTime  } = userSlice.actions

export default userSlice.reducer