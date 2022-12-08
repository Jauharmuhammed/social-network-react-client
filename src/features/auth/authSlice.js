import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,
        token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    },
    reducers: {
        setCredentials: (state, action) => {
            console.log(action.payload);
            localStorage.setItem("token", JSON.stringify(action.payload));
            state.user = jwtDecode(action.payload.access)
            console.log(action.payload);
            state.token = action.payload
            console.log('userUpdated');
        },
        logOut: (state) => {
            localStorage.removeItem("token")
            state.user = null
            state.token = null
        }
    }
})

export const { setCredentials, logOut} = authSlice.actions

export default authSlice.reducer