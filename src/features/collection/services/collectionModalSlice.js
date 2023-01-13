import { createSlice } from "@reduxjs/toolkit";

export const collectionModalSlice = createSlice({
    name: "collectionModal",
    initialState: {
        collectionModal: false,
        createCollectionModal: false,
        editCollectionModal: false,
        deleteCollectionModal: false,
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
        openEditCollectionModal: (state) => {
            if (state.editCollectionModal) {
                state.editCollectionModal = false;
            }
            state.editCollectionModal = true;
        },
        closeEditCollectionModal: (state) => {
            state.editCollectionModal = false;
        },
        openDeleteCollectionModal: (state) => {
            if (state.deleteCollectionModal) {
                state.deleteCollectionModal = false;
            }
            state.deleteCollectionModal = true;
        },
        closeDeleteCollectionModal: (state) => {
            state.deleteCollectionModal = false;
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
    openEditCollectionModal,
    closeEditCollectionModal,
    openDeleteCollectionModal,
    closeDeleteCollectionModal,
    openCollaboratorModal,
    closeCollaboratorModal,
} = collectionModalSlice.actions;
export default collectionModalSlice.reducer;
