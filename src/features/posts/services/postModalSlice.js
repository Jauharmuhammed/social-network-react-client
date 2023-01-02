import { createSlice } from "@reduxjs/toolkit";

export const postModalSlice = createSlice({
    name: "postModal",
    initialState: {
        collectionChangeModal: false,
    },
    reducers: {
        openCollectionChange: (state) => {
            if (state.collectionChangeModal){
                state.collectionChangeModal = false
            }else {
                state.collectionChangeModal = true
            }
            
        },
        closeCollectionChange: (state) => {
            state.collectionChangeModal = false
        },
    },
});

export const { openCollectionChange, closeCollectionChange } = postModalSlice.actions;
export default postModalSlice.reducer;
