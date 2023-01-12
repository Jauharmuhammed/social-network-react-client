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
            console.log(action.payload)
            const index = state.currentUserCollections.findIndex(
                (obj) => obj.slug === action.payload.slug
            );
            if (index !== -1) {
                state.currentUserCollections[index] = action.payload;
            } else {
                state.currentUserCollections = [action.payload, ...state.currentUserCollections];
            }
            state.currentCollection = action.payload;
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
