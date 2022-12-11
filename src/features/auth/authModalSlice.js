import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
    name: 'authModal',
    initialState: {
        loginModal: false,
        signupModal: false,
        emailModal: false,
        forgotPasswordModal: false,
        changePasswordModal: false,
        loginWithOtpModal: false,
    },
    reducers: {
        openLogin: (state) => {
            if (state.signupModal) state.signupModal = false
            state.loginModal = true
        },
        closeLogin: (state) => {
            state.loginModal = false
        },
        openSignup: (state) => {
            if (state.loginModal) state.loginModal = false
            state.signupModal = true
        },
        closeSignup: (state) => {
            state.signupModal = false
        },
        openEmail: (state) => {
            if (state.signupModal) state.signupModal = false
            state.emailModal = true
        },
        closeEmail: (state) => {
            state.emailModal = false
        },
        openForgotPassword: (state) => {
            if (state.loginModal) state.loginModal = false
            state.forgotPasswordModal = true
        },
        closeForgotPassword: (state) => {
            state.forgotPasswordModal = false
        },
        openChangePassword: (state) => {
            state.changePasswordModal = true
        },
        closeChangePassword: (state) => {
            state.changePasswordModal = false
        },
        openLoginWithOtp: (state) => {
            state.loginWithOtpModal = true
        },
        closeLoginWithOtp: (state) => {
            state.loginWithOtpModal = false
        },
    }
})


export const { openLogin, openSignup, closeLogin, closeSignup, openEmail, closeEmail, openForgotPassword, closeForgotPassword, openChangePassword, closeChangePassword, openLoginWithOtp, closeLoginWithOtp } = authModalSlice.actions
export default authModalSlice.reducer