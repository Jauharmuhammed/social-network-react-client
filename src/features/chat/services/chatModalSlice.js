import { createSlice } from "@reduxjs/toolkit";

export const chatModalSlice = createSlice({
    name: "chatModal",
    initialState: {
        chatModal: false,
    },
    reducers: {
        openChatModal: (state) => {
            if (state.chatModal) {
                state.chatModal = false;
            } else {
                state.chatModal = true;
            }
        },
        closeChatModal: (state) => {
            state.chatModal = false;
        },
    },
});

export const {
    openChatModal,
    closeChatModal,
} = chatModalSlice.actions;
export default chatModalSlice.reducer;
