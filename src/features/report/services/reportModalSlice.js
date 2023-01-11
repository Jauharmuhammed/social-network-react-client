import { createSlice } from "@reduxjs/toolkit";

export const reportModalSlice = createSlice({
    name: "reportModal",
    initialState: {
        reportModal: false,
    },
    reducers: {
        openReportModal: (state) => {
            if (state.reportModal) {
                state.reportModal = false;
            } else {
                state.reportModal = true;
            }
        },
        closeReportModal: (state) => {
            state.reportModal = false;
        },
    },
});

export const {
    openReportModal,
    closeReportModal,
} = reportModalSlice.actions;
export default reportModalSlice.reducer;
