import { useDeleteCollectionMutation } from "app/api/collectionApiSlice";
import BackdropSpinner from "components/BackdropSpinner";
import Modal from "components/Modal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import successToast from "utils/toasts/successToast";
import { closeDeleteCollectionModal, openEditCollectionModal } from "../services/collectionModalSlice";

const DeleteCollectionModal = ({collection}) => {
    const deleteCollectionOverlay = useSelector(state => state.collectionModal.deleteCollectionModal)
    const user = useSelector(state => state.auth.user)
    const [deleteCollection, { isLoading }] = useDeleteCollectionMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    async function handleDelete() {
        try {
            const response = await deleteCollection(collection?.id).unwrap();
            console.log(response);
            navigate(`/${user.username}`);
            successToast("Collection deleted successfully");
            dispatch(closeDeleteCollectionModal())
        } catch (err) {
            console.log(err);
            dispatch(closeDeleteCollectionModal())
        }
    }

    function handleCancel() {
        dispatch(closeDeleteCollectionModal())
        dispatch(openEditCollectionModal())
    }

    if (isLoading) return <BackdropSpinner />;
    return (
        <Modal id={`deleteCollectionModal-${collection?.id}`} active={deleteCollectionOverlay} closeActive={() => dispatch(closeDeleteCollectionModal())}>
            <div className="flex flex-col items-center py-5">
                <h3 className="py-2 text-2xl">Delete {collection?.name}?</h3>
                <p className="mb-4">Are you sure you want to delete this collection?</p>
                <button
                    onClick={handleDelete}
                    className="py-1.5 bg-transparent outline-none text-red-500 cursor-pointer w-full">
                    Yes! Delete Forever
                </button>
                <button
                    onClick={handleCancel}
                    className="py-1.5 bg-transparent outline-none cursor-pointer w-full">
                    No Keep it.
                </button>
            </div>
        </Modal>
    );
};

export default DeleteCollectionModal;
