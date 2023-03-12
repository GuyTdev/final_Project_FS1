import { apiSlice } from "../../app/api/apiSlice"

// Define a service using a base URL and expected endpoints
export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({username,password}) => ({
        url: `../auth/login`,
        method: 'POST',
        body: {username,password},
      }),
      invalidatesTags: ['Users'],
    }),
    createUserPassword: builder.mutation({
      query: ({username,password}) => ({
        url: `../auth/create_account`,
        method: 'POST',
        body: {username,password},
      }),
      invalidatesTags: ['Users'],
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation, useCreateUserPasswordMutation } = usersApi