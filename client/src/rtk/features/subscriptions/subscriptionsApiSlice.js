import { apiSlice } from "../../app/api/apiSlice"

// Define a service using a base URL and expected endpoints
export const subscriptionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriptions: builder.query({
      query: () => `subscriptions_ws/subscriptions`,
      providesTags: ['Subscriptions'],
    }),
    getSubscription: builder.query({
      query: (id) => `subscriptions_ws/subscriptions/${id}`,
      providesTags: ['Subscriptions'],
    }),
    getSubscriptionByMemberId: builder.query({
      query: (member_id) => `subscriptions_ws/subscriptions/bymember/${member_id}`,
      providesTags: ['Subscriptions'],
    }),
    createSubscription: builder.mutation({
      query: (newSubscription) => ({
        url: `subscriptions_ws/subscriptions`,
        method: 'POST',
        body: newSubscription,
      }),
      invalidatesTags: ['Subscriptions'],
    }),
    updateSubscription: builder.mutation({
      query: (subscription) => ({
        url: `subscriptions_ws/subscriptions/${subscription._id}`,
        method: 'PATCH',
        body: subscription,
      }),
      invalidatesTags: ['Subscriptions'],
    }),

    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `subscriptions_ws/subscriptions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscriptions'],
    }),
    deleteSubscriptionByMemberId: builder.mutation({
      query: (id) => ({
        url: `subscriptions_ws/subscriptions/member/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscriptions'],
    }),
    deleteMovieFromAllSubscriptions: builder.mutation({
      query: (id) => ({
        url: `subscriptions_ws/subscriptions/movie/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscriptions'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllSubscriptionsQuery, useGetSubscriptionQuery,useGetSubscriptionByMemberIdQuery, useCreateSubscriptionMutation, useUpdateSubscriptionMutation, useDeleteSubscriptionMutation, useDeleteSubscriptionByMemberIdMutation, useDeleteMovieFromAllSubscriptionsMutation } = subscriptionsApi