import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from 'features/auth/services/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://showyourwork.jauharmuhammed.com',
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${(token?.access)}`)
        }
        if (!headers.has("Content-Type")) {
            headers.set("Content-Type", "application/json");
        }
        return headers
    }
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({})
})

