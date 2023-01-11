import { forceDownload } from "utils/forceDownload";
import React, { useEffect, useState } from "react";
import Modal from "components/Modal";
import DeletePostModal from "./DeletePostModal";
import { singlePost } from "../services/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeReportModal, openReportModal } from "features/report/services/reportModalSlice";
import { setReportType } from "features/report/services/reportSlice";

const Menu = ({ showMenu, setShowMenu, setEdit, setDeletePostOverlay }) => {
    const post = useSelector(singlePost);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const [sameUser, setSameUser] = useState(false);

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
        setDeletePostOverlay(true);
    }

    function handleReportPost() {
        dispatch(setReportType('post'))
        setShowMenu(false);
        dispatch(openReportModal());
    }
    function handleReportUser() {
        dispatch(setReportType('user'))
        setShowMenu(false);
        dispatch(openReportModal());
    }

    useEffect(() => {
        if (user.user_id === post.user) {
            setSameUser(true);
        } else {
            setSameUser(false);
        }
    }, [user, post]);

    return (
        <Modal id="postMenuToggleButton" active={showMenu} closeActive={() => setShowMenu(false)}>
            <ul className="flex flex-col items-center list-none">
                <li
                    onClick={handleDownload}
                    className="py-2.5 px-3 w-full text-center hover:bg-stone-600 rounded-2xl cursor-pointer">
                    Download Image
                </li>
                {!sameUser && (
                    <>
                        <li
                            onClick={handleReportPost}
                            className="py-2.5 px-3 w-full text-center hover:bg-stone-600 rounded-2xl cursor-pointer">
                            Report Post
                        </li>
                        <li onClick={handleReportUser} className="py-2.5 px-3 w-full text-center hover:bg-stone-600 rounded-2xl cursor-pointer">
                            Report User
                        </li>
                    </>
                )}
                {sameUser && (
                    <>
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
                    </>
                )}
            </ul>
        </Modal>
    );
};

export default Menu;
