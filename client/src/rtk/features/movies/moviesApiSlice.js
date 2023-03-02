import { apiSlice } from "../../app/api/apiSlice"

// Define a service using a base URL and expected endpoints
export const moviesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `subscriptions_ws/movies`,
      providesTags: ['Movies'],
    }),
    getMovie: builder.query({
      query: (id) => `subscriptions_ws/movies/${id}`,
      providesTags: ['Movies'],
    }),
    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `subscriptions_ws/movies`,
        method: 'POST',
        body: newMovie,
      }),
      invalidatesTags: ['Movies'],
    }),
    updateMovie: builder.mutation({
      query: (movie) => ({
        url: `subscriptions_ws/movies/${movie._id}`,
        method: 'PATCH',
        body: movie,
      }),
      invalidatesTags: ['Movies'],
    }),

    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `subscriptions_ws/movies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Movies'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllMoviesQuery, useGetMovieQuery, useCreateMovieMutation, useUpdateMovieMutation, useDeleteMovieMutation } = moviesApi