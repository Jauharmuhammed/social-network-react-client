import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const userSlice = createSlice({
    name: 'user',
    initialState: () => localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,
    reducers: {
        updateUser: (state, action) => {
            state = action.payload
        },
        removeUser: (state) => {
            state = null
        }
    }
})

export const {updateUser, removeUser} = userSlice.actions;
export default userSlice.reducer