import { apiSlice } from "../../app/api/apiSlice"

// Define a service using a base URL and expected endpoints
export const moviesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `/subscriptions_ws/movies`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllMoviesQuery } = moviesApi