import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from 'features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000',
    // credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${(token?.access)}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403 || result?.error?.originalStatus === 401){
        console.log('Sending refresh token');

        // send refresh token to get the new access token
        const refreshResult = await baseQuery('/api/token/refresh/', api, extraOptions)
        console.log(refreshResult);
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user}))
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})

