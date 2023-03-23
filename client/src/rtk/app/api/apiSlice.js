import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://cinema-ws.onrender.com/api' }),
    tagTypes: ['User','Movie','Member','Subscription'],
    endpoints: builder => ({})
})