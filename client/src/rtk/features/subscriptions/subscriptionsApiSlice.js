import { apiSlice } from "../../app/api/apiSlice"

// Define a service using a base URL and expected endpoints
export const subscriptionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriptions: builder.query({
      query: () => `/subscriptions_ws/subscriptions`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllSubscriptionsQuery } = subscriptionsApi