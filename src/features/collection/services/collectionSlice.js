import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
    name: "collection",
    initialState: {
        currentUserCollections: [],
        currentCollection: null,
    },
    reducers: {
        setCurrentUserCollections: (state, action) => {
            state.currentUserCollections = action.payload;
        },
        updateCurrentUserCollections: (state, action) => {
            console.log(action.payload.data);
            const index = state.currentUserCollections.findIndex((obj) => obj.id === action.payload.data.id)
            state.currentUserCollections[index] = action.payload.data
            state.currentCollection = action.payload.data
        },
        setCurrentCollection: (state, action) => {
            state.currentCollection = action.payload;
        },

    },
});

export const { setCurrentUserCollections, setCurrentCollection , updateCurrentUserCollections} = collectionSlice.actions;

export default collectionSlice.reducer;
