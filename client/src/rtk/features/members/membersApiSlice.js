import { apiSlice } from "../../app/api/apiSlice"

// Define a service using a base URL and expected endpoints
export const membersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMembers: builder.query({
      query: () => `subscriptions_ws/members`,
      providesTags: ['Members'],
    }),
    getMember: builder.query({
      query: (id) => `subscriptions_ws/members/${id}`,
      providesTags: ['Members'],
    }),
    createMember: builder.mutation({
      query: (newMember) => ({
        url: `subscriptions_ws/members`,
        method: 'POST',
        body: newMember,
      }),
      invalidatesTags: ['Members'],
    }),
    updateMember: builder.mutation({
      query: (member) => ({
        url: `subscriptions_ws/members/${member._id}`,
        method: 'PATCH',
        body: member,
      }),
      invalidatesTags: ['Members'],
    }),

    deleteMember: builder.mutation({
      query: (id) => ({
        url: `subscriptions_ws/members/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Members'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllMembersQuery, useGetMemberQuery, useCreateMemberMutation, useUpdateMemberMutation, useDeleteMemberMutation } = membersApi