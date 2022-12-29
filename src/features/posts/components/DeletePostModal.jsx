import { useDeletePostMutation } from "app/api/postApiSlice";
import BackdropSpinner from "components/BackdropSpinner";
import Modal from "components/Modal";
import React from "react";
import { useNavigate } from "react-router-dom";
import successToast from "utils/toasts/successToast";

const DeletePostModal = ({ post, postDelete, setPostDelete }) => {
    const [deletePost, { isLoading }] = useDeletePostMutation();
    const navigate = useNavigate();

    async function handleDelete() {
        try {
            const response = await deletePost(post?.id).unwrap();
            console.log(response);
            navigate("/");
            successToast("Post deleted successfully");
        } catch (err) {
            console.log(err);
        }
    }

    if (isLoading) return <BackdropSpinner />;
    return (
        <Modal id="deletePostModal" active={postDelete} closeActive={() => setPostDelete(false)}>
            <div className="flex flex-col items-center py-5">
                <h3 className="py-2 text-2xl">Delete Post?</h3>
                <p className="mb-4">Are you sure you want to delete this post?</p>
                <button
                    onClick={handleDelete}
                    className="py-1.5 bg-transparent outline-none text-red-500 cursor-pointer w-full">
                    Yes! Delete
                </button>
                <button
                    onClick={() => setPostDelete(false)}
                    className="py-1.5 bg-transparent outline-none cursor-pointer w-full">
                    No Keep it.
                </button>
            </div>
        </Modal>
    );
};

export default DeletePostModal;
