import { forceDownload } from "utils/forceDownload";
import React, { useState } from "react";
import Modal from "components/Modal";
import DeletePostModal from "./DeletePostModal";

const Menu = ({ post, id, showMenu, setShowMenu, setEdit }) => {
    const [postDelete, setPostDelete] = useState(false);

    function handleEditClick() {
        setEdit((prev) => !prev);
        setShowMenu(false);
    }

    function handleDownload() {
        forceDownload(post);
        setShowMenu(false);
    }

    function handleDeletePost() {
        setShowMenu(false);
        setPostDelete(true);
    }
    return (
        <Modal id={id} active={showMenu} closeActive={() => setShowMenu(false)}>
            <ul className="flex flex-col items-center list-none">
                <li
                    onClick={handleDownload}
                    className="py-2.5 px-3 w-full text-center hover:bg-stone-600 rounded-2xl cursor-pointer">
                    Download Image
                </li>
                <li className="py-2.5 px-3 w-full text-center hover:bg-stone-600 rounded-2xl cursor-pointer">
                    Report Post
                </li>
                <li className="py-2.5 px-3 w-full text-center hover:bg-stone-600 rounded-2xl cursor-pointer">
                    Report User
                </li>
                <li
                    onClick={handleEditClick}
                    className="py-2.5 px-3 w-full text-center hover:bg-stone-600 rounded-2xl cursor-pointer">
                    Edit post
                </li>
                <li
                    onClick={handleDeletePost}
                    className="py-2.5 px-3 w-full text-center hover:bg-stone-600 rounded-2xl cursor-pointer">
                    Delete post
                </li>
            </ul>
        </Modal>
    );
};

export default Menu;
