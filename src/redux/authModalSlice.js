import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
    name: 'authModal',
    initialState: {
        loginModal: false,
        signupModal: false,
    },
    reducers:{
        openLogin: (state) =>{
            if (state.signupModal) state.signupModal = false
            state.loginModal = true
        },
        openSignup: (state) =>{
            if (state.loginModal) state.loginModal = false
            state.signupModal = true
        },
        closeLogin: (state) => {
            state.loginModal = false
        },
        closeSignup: (state) => {
            state.signupModal = false
        }
    }
})


export const { openLogin, openSignup, closeLogin, closeSignup} = authModalSlice.actions
export default authModalSlice.reducer