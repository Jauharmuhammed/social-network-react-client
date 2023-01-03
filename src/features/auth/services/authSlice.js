import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,
        token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
        newUser: {email:null}
    },
    reducers: {
        setCredentials: (state, action) => {
            localStorage.setItem("token", JSON.stringify(action.payload));
            state.user = jwtDecode(action.payload.access)
            state.token = action.payload
            console.log('userUpdated');
        },
        logOut: (state) => {
            localStorage.removeItem("token")
            state.user = null
            state.token = null
        },
        setNewUser: (state, action) => {
            state.newUser.email = action.payload
        },
        
    }
})

export const { setCredentials, logOut, setNewUser} = authSlice.actions

export default authSlice.reducer