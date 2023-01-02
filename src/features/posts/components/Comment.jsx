import React, { useEffect, useState } from "react";
import TimeAgo from "components/TimeAgo";
import Replies from "./Replies";
import { useLikeCommentMutation } from "app/api/postApiSlice";
import { useSelector } from "react-redux";
import DeleteCommentModal from "./DeleteCommentModal";
import { singlePostComments } from "../services/postSlice";

const Comment = ({ comment, setReplyTo, commentRef }) => {
    const user = useSelector((state) => state.auth.user);
    const comments = useSelector(singlePostComments)

    const [commentBody, setCommentBody] = useState("");
    const [hidden, setHidden] = useState(true);
    const [clipped, setClipped] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [liked, setliked] = useState(false);

    const [deletable, setDeletable] = useState(false); 
    const [likeCount, setLikeCount] = useState(0);
    const [likeComment] = useLikeCommentMutation();

    const [deleteCommentOverlay, setDeleteCommentOverlay] = useState(false)

    async function handleLike() {
        try {
            const response = await likeComment({ id: comment?.id }).unwrap();
            console.log(response);
            if (response === "Comment liked") {
                setliked(true);
                setLikeCount((prev) => Number(prev) + 1);
            }
            if (response === "Comment disliked") {
                setliked(false);
                setLikeCount((prev) => Number(prev) - 1);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (comment.body.length > 80) {
            setCommentBody(comment.body.substring(0, 80));
            setClipped(true);
        } else {
            setCommentBody(comment.body);
        }
    }, [comment.body]);

    useEffect(() => {
        if (comment?.replies_count > 0 && comment?.replies_count < 2) {
            setShowReplies(true);
        }

        const is_liked = comment?.like?.some((liked_user) => liked_user === user.user_id);
        if (is_liked) {
            setliked(true);
        }

        setLikeCount(comment?.likes_count > 0 ? comment?.likes_count : "");

        comment?.user === user?.user_id && setDeletable(true);
    }, [comment, user.user_id]);

    return (
        <li className="flex flex-col gap-2">
            <div className="flex gap-2">
                <img
                    className="w-8 h-8 aspect-square rounded-full object-cover cursor-pointer"
                    src={comment.profile_pic}
                    alt={comment.username}
                />
                <div className="flex-col">
                    <p className="text-sm font-light text-gray-100">
                        <span className="text-base font-normal text-white mr-2">
                            {comment.username}
                        </span>
                        {commentBody}
                        {clipped && (
                            <span
                                onClick={() => {
                                    setCommentBody((prev) =>
                                        prev === comment.body
                                            ? comment.body.substring(0, 80)
                                            : comment.body
                                    );
                                    setHidden((prev) => !prev);
                                }}
                                className="text-white font-normal ml-auto cursor-pointer">
                                &nbsp;...{hidden ? "See more" : "See less"}
                            </span>
                        )}
                    </p>
                    <div className="flex gap-3 items-center">
                        <TimeAgo
                            timestamp={comment.created}
                            className="text-gray-400 text-sm font-light"
                        />
                        <span
                            onClick={() => {
                                setReplyTo(comment);
                                commentRef.current.focus();
                                commentRef.current.value = `@${comment.username} `;
                            }}
                            className="text-gray-400 text-sm cursor-pointer ">
                            Reply
                        </span>
                        {comment?.replies_count > 0 && (
                            <span
                                onClick={() => setShowReplies((prev) => !prev)}
                                className="text-gray-400 text-sm cursor-pointer">
                                {showReplies
                                    ? "Hide Replies"
                                    : `View replies (${comment?.replies_count})`}
                            </span>
                        )}
                        <span
                            onClick={handleLike}
                            className="cursor-pointer flex gap-1 items-center">
                            {liked ? (
                                <span className="text-red-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width=".9em"
                                        height=".9em"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"
                                        />
                                    </svg>
                                </span>
                            ) : (
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width=".9em"
                                        height=".9em"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
                                        />
                                    </svg>
                                </span>
                            )}

                            <span className="text-sm text-gray-400 ">
                                {likeCount > 0 ? likeCount : ""}
                            </span>
                        </span>
                        { deletable && <span onClick={()=> setDeleteCommentOverlay(true)} className="text-gray-400 text-sm cursor-pointer">
                            Delete
                        </span>}
                        <DeleteCommentModal comment={comment} deleteCommentOverlay={deleteCommentOverlay} setDeleteCommentOverlay={setDeleteCommentOverlay} />
                    </div>
                </div>
            </div>
            {showReplies && (
                <Replies
                    comment={comment}
                    commentRef={commentRef}
                    setReplyTo={setReplyTo}
                />
            )}
        </li>
    );
};

export default Comment;
