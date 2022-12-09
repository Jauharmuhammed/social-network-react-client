import { apiSlice } from "./apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/token/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/api/register/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        googleAuth: builder.mutation({
            query: credentials => ({
                url: '/api/auth/google/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        verifyMail: builder.mutation({
            query: credentials => ({
                url: '/api/verify/mail/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
}) 

export const {
    useLoginMutation,
    useRegisterMutation,
    useGoogleAuthMutation,
    useVerifyMailMutation,
} = authApiSlice