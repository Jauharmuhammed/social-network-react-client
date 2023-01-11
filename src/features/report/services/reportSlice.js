import { createSlice } from "@reduxjs/toolkit";

export const reportSlice = createSlice({
    name: "report",
    initialState: {
        type: '',
    },
    reducers: {
        setReportType: (state, action) => {
            state.type = action.payload
        },
      
    },
});

export const {
    setReportType,
} = reportSlice.actions;
export default reportSlice.reducer;
