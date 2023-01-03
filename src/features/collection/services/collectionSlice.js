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
            console.log(index);
            state.currentUserCollections[index] = action.payload.data
            // state.currentUserCollections = [action.payload.data, ...state.currentUserCollections];
        },
        setCurrentCollection: (state, action) => {
            state.currentCollection = action.payload;
        },
        // addToCurrentUserCollections: (state, action) => {
        //     const {collection, post} = action.payload
        //     const index = state.currentUserCollections.findIndex((obj) => obj.id === collection)
        //     state.currentUserCollections[index].posts = [...state.currentUserCollections[index].posts, post]
        // },
        // removeFronCurrentUserCollections: (state, action) => {
        //     const {collection, post} = action.payload
        //     console.log(post);
        //     const index = state.currentUserCollections.findIndex((obj) => obj.id === collection)
        //     state.currentUserCollections = state.currentUserCollections[index].posts.filter((obj) => {return obj !== post})
        // }
    },
});

export const { setCurrentUserCollections, setCurrentCollection , updateCurrentUserCollections} = collectionSlice.actions;

export default collectionSlice.reducer;
