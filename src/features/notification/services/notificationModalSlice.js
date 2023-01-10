import { createSlice } from "@reduxjs/toolkit";

export const NotificationModalSlice = createSlice({
    name: "notificationModal",
    initialState: {
        notificationModal: false,
    },
    reducers: {
        openNotificationModal: (state) => {
            if (state.notificationModal) {
                state.notificationModal = false;
            } else {
                state.notificationModal = true;
            }
        },
        closeNotificationModal: (state) => {
            state.notificationModal = false;
        },
    },
});

export const {
    openNotificationModal,
    closeNotificationModal,
} = NotificationModalSlice.actions;
export default NotificationModalSlice.reducer;
