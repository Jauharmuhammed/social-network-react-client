import { createSlice } from "@reduxjs/toolkit";

export const collectionModalSlice = createSlice({
    name: "collectionModal",
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

export const { openCollectionChange, closeCollectionChange } = collectionModalSlice.actions;
export default collectionModalSlice.reducer;
