import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        currentConversation: null,
    },
    reducers: {
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload
        }
    },
});

export const {
    setCurrentConversation,
} = chatSlice.actions;
export default chatSlice.reducer;
