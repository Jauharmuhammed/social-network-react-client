import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
    name: 'authModal',
    initialState: {
        loginModal: false,
        signupModal: false,
        emailModal: false,
    },
    reducers: {
        openLogin: (state) => {
            if (state.signupModal) state.signupModal = false
            state.loginModal = true
        },
        openSignup: (state) => {
            if (state.loginModal) state.loginModal = false
            state.signupModal = true
        },
        openEmail: (state) => {
            if (state.signupModal) state.signupModal = false
            state.emailModal = true
        },
        closeLogin: (state) => {
            state.loginModal = false
        },
        closeSignup: (state) => {
            state.signupModal = false
        },
        closeEmail: (state) => {
            state.emailModal = false
        },
    }
})


export const { openLogin, openSignup, closeLogin, closeSignup, openEmail, closeEmail } = authModalSlice.actions
export default authModalSlice.reducer