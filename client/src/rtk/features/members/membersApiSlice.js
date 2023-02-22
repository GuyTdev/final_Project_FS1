import { apiSlice } from "../../app/api/apiSlice"

// Define a service using a base URL and expected endpoints
export const membersApi = apiSlice.injectEndpoints({
  reducerPath: 'membersApi',
  endpoints: (builder) => ({
    getAllMembers: builder.query({
      query: () => `/subscriptions_ws/members`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllMembersQuery } = membersApi