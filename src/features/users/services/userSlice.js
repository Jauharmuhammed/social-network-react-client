import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        details:null,
        created: null,
        saved: null,
    },
    reducers:{
        setUserDetails: (state, action) => {
            console.log(action.payload);
            state.details = action.payload
        }
    }
})

export const {setUserDetails} = userSlice.actions

export default userSlice.reducer