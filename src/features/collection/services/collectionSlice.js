import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
    name: "collection",
    initialState: {
        currentUserCollections: [],
        currentCollection: null,
        selectedPostToSave: null,
    },
    reducers: {
        setCurrentUserCollections: (state, action) => {
            state.currentUserCollections = action.payload;
        },
        updateCurrentUserCollections: (state, action) => {
            console.log(action.payload.data);
            const index = state.currentUserCollections.findIndex(
                (obj) => obj.id === action.payload.data.id
            );
            state.currentUserCollections[index] = action.payload.data;
            state.currentCollection = action.payload.data;
        },
        setCurrentCollection: (state, action) => {
            state.currentCollection = action.payload;
        },
        setSelectedPostToSave: (state, action) => {
            state.selectedPostToSave = action.payload;
        },
    },
});

export const {
    setCurrentUserCollections,
    setCurrentCollection,
    updateCurrentUserCollections,
    setSelectedPostToSave,
} = collectionSlice.actions;

export default collectionSlice.reducer;
