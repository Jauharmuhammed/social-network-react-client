import { createSlice } from "@reduxjs/toolkit";

export const chatNotificationSlice = createSlice({
    name: "chatNotification",
    initialState: {
        unreadMessageCount: 0,
        connectionStatus: "",
    },
    reducers: {
        updateUnreadMessageCount: (state, action) => {
            state.unreadMessageCount = action.payload;
        },
        updateConnectionStatus: (state, action) => {
            state.unreadMessageCount = action.payload;
        },
    },
});

export const { updateUnreadMessageCount, updateConnectionStatus } = chatNotificationSlice.actions;
export default chatNotificationSlice.reducer;
