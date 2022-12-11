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
        forgotPassowrd: builder.mutation({
            query: credentials => ({
                url: '/api/forgot-password/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        forgotPassowrdVerify: builder.mutation({
            query: credentials => ({
                url: '/api/forgot-password/verify/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        changePassowrd: builder.mutation({
            query: credentials => ({
                url: '/api/reset-password/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendOtp: builder.mutation({
            query: credentials => ({
                url: '/api/send-otp/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        loginWithOtp: builder.mutation({
            query: credentials => ({
                url: '/api/login-with-otp/',
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
    useForgotPassowrdMutation,
    useForgotPassowrdVerifyMutation,
    useChangePassowrdMutation,
    useSendOtpMutation,
    useLoginWithOtpMutation,
} = authApiSlice