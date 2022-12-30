import { useDeleteCommentMutation } from "app/api/postApiSlice";
import BackdropSpinner from "components/BackdropSpinner";
import Modal from "components/Modal";
import React from "react";
import successToast from "utils/toasts/successToast";

const DeleteCommentModal = ({ comment, deleteCommentOverlay, setDeleteCommentOverlay }) => {
    const [deleteComment, { isLoading }] = useDeleteCommentMutation();

    async function handleDelete() {
        try {
            const response = await deleteComment(comment?.id).unwrap();
            console.log(response);
            setDeleteCommentOverlay(false)
            successToast("Comment deleted successfully");
        } catch (err) {
            console.log(err);
        }
    }

    if (isLoading) return <BackdropSpinner />;
    return (
        <Modal id={`deleteCommentModal-${comment.id}`} active={deleteCommentOverlay} closeActive={() => setDeleteCommentOverlay(false)}>
            <div className="flex flex-col items-center py-5">
                <h3 className="py-2 text-2xl">Delete?</h3>
                <p className="mb-4">Are you sure you want to delete this comment?</p>
                <button
                    onClick={handleDelete}
                    className="py-1.5 bg-transparent outline-none text-red-500 cursor-pointer w-full">
                    Yes! Delete.
                </button>
                <button
                    onClick={() => setDeleteCommentOverlay(false)}
                    className="py-1.5 bg-transparent outline-none cursor-pointer w-full">
                    No Keep it.
                </button>
            </div>
        </Modal>
    );
};

export default DeleteCommentModal;
