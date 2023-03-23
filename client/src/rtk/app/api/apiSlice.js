import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://guytdev-msw.onrender.com/api' }),
    tagTypes: ['User','Movie','Member','Subscription'],
    endpoints: builder => ({})
})