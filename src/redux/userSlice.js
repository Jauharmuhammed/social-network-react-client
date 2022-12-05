import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import axios from '../utils/axios'



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    },
    reducers: {
        updateUser: (state, action) => {
            localStorage.setItem("token", JSON.stringify(action.payload));
            state.user = jwtDecode(action.payload.access)
            console.log(action.payload);
            state.token = action.payload
            console.log('userUpdated');
        },
        logoutUser: (state) => {
            localStorage.removeItem("token")
            state.user = null
            state.token = null
        },
        // updateToken: (state) => {
        //     console.log('token updation triggered');
        //     console.log(JSON.parse(state.token));
        //     tokenUpdate()
        // },
    }
})

export const { updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer