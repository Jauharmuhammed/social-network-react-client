import { useDeleteCommentMutation } from "app/api/postApiSlice";
import BackdropSpinner from "components/BackdropSpinner";
import Modal from "components/Modal";
import React from "react";
import { useDispatch } from "react-redux";
import successToast from "utils/toasts/successToast";
import { removeComment } from "../services/postSlice";

                        
const DeleteReplyModal = ({ reply, setReplies, deleteReplyOverlay, setDeleteReplyOverlay }) => {
    const [deleteComment, { isLoading }] = useDeleteCommentMutation();
    const dispatch = useDispatch()

    async function handleDelete() {
        try {
            const response = await deleteComment(reply?.id).unwrap();
            console.log(response);
            setDeleteReplyOverlay(false)
            setReplies(prev => {
                return prev.filter(obj => obj.id !== reply.id)
            })
            successToast("Reply deleted successfully");
        } catch (err) {
            console.log(err);
        }
    }

    if (isLoading) return <BackdropSpinner />;
    return (
        <Modal id={`deleteCommentModal-${reply.id}`} active={deleteReplyOverlay} closeActive={() => setDeleteReplyOverlay(false)}>
            <div className="flex flex-col items-center py-5">
                <h3 className="py-2 text-2xl">Delete?</h3>
                <p className="mb-4">Are you sure you want to delete this reply?</p>
                <button
                    onClick={handleDelete}
                    className="py-1.5 bg-transparent outline-none text-red-500 cursor-pointer w-full">
                    Yes! Delete.
                </button>
                <button
                    onClick={() => setDeleteReplyOverlay(false)}
                    className="py-1.5 bg-transparent outline-none cursor-pointer w-full">
                    No Keep it.
                </button>
            </div>
        </Modal>
    );
};

export default DeleteReplyModal;
