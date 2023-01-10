import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        unreadCount: 0,
        notifications: []
    },
    reducers: {
        setUnreadNotificationCount: (state, action) => {
            state.unreadCount = action.payload;
        },
        increaseUnreadNotificationCount: (state) => {
            state.unreadCount += 1
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload
        },
        updateNotifications: (state, action) => {
            state.notifications = [action.payload, ...state.notifications]
        },
    },
});

export const {
    setUnreadNotificationCount,
    increaseUnreadNotificationCount,
    setNotifications,
    updateNotifications,
} = notificationSlice.actions;
export default notificationSlice.reducer;
