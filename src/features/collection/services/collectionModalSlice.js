import { createSlice } from "@reduxjs/toolkit";

export const collectionModalSlice = createSlice({
    name: "collectionModal",
    initialState: {
        collectionModal: false,
        createCollectionModal: false,
        collaboratorModal: false,
    },
    reducers: {
        openCollectionModal: (state) => {
            if (state.collectionModal) {
                state.collectionModal = false;
            } else {
                state.collectionModal = true;
            }
        },
        closeCollectionModal: (state) => {
            state.collectionModal = false;
        },
        openCreateCollectionModal: (state) => {
            if (state.collectionModal) {
                state.collectionModal = false;
            }
            state.createCollectionModal = true;
        },
        closeCreateCollectionModal: (state) => {
            state.createCollectionModal = false;
        },
        openCollaboratorModal: (state) => {
            if (state.collaboratorModal) {
                state.collaboratorModal = false;
            }
            state.collaboratorModal = true;
        },
        closeCollaboratorModal: (state) => {
            state.collaboratorModal = false;
        },
    },
});

export const {
    openCollectionModal,
    closeCollectionModal,
    openCreateCollectionModal,
    closeCreateCollectionModal,
    openCollaboratorModal,
    closeCollaboratorModal,
} = collectionModalSlice.actions;
export default collectionModalSlice.reducer;
