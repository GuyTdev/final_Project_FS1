import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: sessionStorage.getItem("username"),
  isAdmin:false,
  firstName: sessionStorage.getItem("firstName"),
  lastName: sessionStorage.getItem("lastName"),
  sessionsTimeout: sessionStorage.getItem("sessionsTimeout"),
  permissions: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMongoDbFetchedUser: (state, action) => {
        state.email = action.payload;
    },
    setUserPermissions: (state,action) => {
         state.permissions = action.payload;
    },
    setUserRoleAsAdmin: (state) => {
         state.isAdmin = true;
    },
    setUserRoleAsSimpleManager: (state) => {
         state.isAdmin = false;
    },

  },
})

// Action creators are generated for each case reducer function
export const { setMongoDbFetchedUser, setUserPermissions, setUserRoleAsAdmin, setUserRoleAsSimpleManager  } = userSlice.actions

export default userSlice.reducer