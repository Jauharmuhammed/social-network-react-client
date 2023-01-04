import { useAddCommentMutation, useGetCommentsByPostMutation } from "app/api/postApiSlice";
import classNames from "classnames";
import Button from "components/Button";
import ButtonSpinner from "components/ButtonSpinner";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import errorToast from "utils/toasts/errorToast";
import {
    addComments,
    increasePostCommentCount,
    setComments,
    singlePostComments,
} from "../services/postSlice";
import Comment from "./Comment";
import EmojiPicker from "emoji-picker-react";

const Comments = ({ post }) => {
    const user = useSelector((state) => state.auth.user);
    const comments = useSelector(singlePostComments);
    const [toggle, setToggle] = useState(false);
    const commentRef = useRef();
    const [addComment, { isLoading }] = useAddCommentMutation();
    const [getCommetnsByPost] = useGetCommentsByPostMutation();
    const [replyTo, setReplyTo] = useState(null);

    const [showEmoji, setShowEmoji] = useState(false);
    const dispatch = useDispatch();

    async function handleSubmit() {
        if (
            commentRef.current.value === "" ||
            commentRef.current.value.trim() === `@${replyTo?.username}`
        )
            return;
        const mention = `@${replyTo?.username}`;
        let data;
        if (commentRef.current.value.includes(mention) === false) {
            data = {
                user: user.user_id,
                post: post.id,
                body: commentRef.current.value,
            };
        } else {
            data = {
                parent: replyTo ? replyTo.id : "",
                user: user.user_id,
                post: post.id,
                body: commentRef.current.value.replace(`@${replyTo?.username} `, ""),
            };
        }
        try {
            const response = await addComment(data).unwrap();

            if (!replyTo) {
                dispatch(addComments(response));
                setToggle(true);
                dispatch(increasePostCommentCount());
            } else {
                fetchComments();
                dispatch(increasePostCommentCount());
            }

            // set input as empty
            commentRef.current.value = "";

            setReplyTo(null);
        } catch (err) {
            errorToast(err);
        }
    }

    async function fetchComments() {
        try {
            const response = await getCommetnsByPost(post?.id).unwrap();
            dispatch(setComments(response));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log(post?.id);
        if (post?.id !== undefined) {
            fetchComments();
        }
    }, [post]);

    function handleBackspace(e) {
        if (e.key === "Backspace" && commentRef.current.value === `@${replyTo?.username} `) {
            commentRef.current.value = "";
            setReplyTo(null);
        }
    }

    function handleEmoji(emojiData) {
        commentRef.current.value += emojiData?.emoji;
        setShowEmoji(false);
    }


    return (
        <div className="flex flex-col ">
            <div className="flex gap-1 items-center">
                <h2 className="text-2xl font-medium my-4">
                    {post?.comments_count > 0 && post?.comments_count} Comments
                </h2>
                <span
                    className={classNames("cursor-pointer", toggle && "rotate-90 ")}
                    onClick={() => setToggle((prev) => !prev)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                        />
                    </svg>
                </span>
            </div>

            {toggle && comments.length > 0 && (
                <ul className="list-none my-3 flex gap-3 flex-col">
                    {comments?.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            commentRef={commentRef}
                            setReplyTo={setReplyTo}
                        />
                    ))}
                </ul>
            )}
            <div className="flex gap-2 items-center mb-10">
                <img
                    className="w-10 aspect-square rounded-full object-cover"
                    src={user?.profile_pic}
                    alt={user?.username}
                />
                <div className="w-full relative">
                    <input
                        ref={commentRef}
                        type="text"
                        className="bg-transparent w-full rounded-3xl border py-2 px-3 outline-none"
                        placeholder="Add a comment"
                        onKeyDown={handleBackspace}
                        onClick={() => setShowEmoji(false)}
                    />
                    <span
                        onClick={() => setShowEmoji((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5em"
                            height="1.5em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="30" fill="#ffdd67" />
                            <circle cx="22.3" cy="31.6" r="5" fill="#664e27" />
                            <path
                                fill="#917524"
                                d="M51.2 27.5c-3.2-2.7-7.5-3.9-11.7-3.1c-.6.1-1.1-2-.4-2.2c4.8-.9 9.8.5 13.5 3.6c.6.5-1 2.1-1.4 1.7m-26.7-8.7c-4.2-.7-8.5.4-11.7 3.1c-.4.4-2-1.2-1.4-1.7c3.7-3.2 8.7-4.5 13.5-3.6c.7.2.2 2.3-.4 2.2"
                            />
                            <path
                                fill="#664e27"
                                d="M50.2 34.3c-1.7-3.5-4.4-5.3-7-5.3s-5.2 1.8-7 5.3c-.2.4.7 1 1.2.6c1.7-1.3 3.7-1.8 5.8-1.8s4.1.5 5.8 1.8c.4.3 1.3-.3 1.2-.6m-6.1 7.9c-6.9 3.6-16.4 2.9-19.1 2.9c-.7 0-1.2.3-1 .9c2 7 17 7 21.1-2.7c.5-1.1-.3-1.4-1-1.1"
                            />
                        </svg>
                    </span>
                    {showEmoji && (
                        <span className="absolute bottom-12 right-0">
                            <EmojiPicker onEmojiClick={handleEmoji} />
                        </span>
                    )}
                </div>

                <Button
                    disabled={isLoading}
                    text={isLoading ? <ButtonSpinner /> : replyTo ? "Reply" : "Done"}
                    className="bg-white text-darkgray"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Comments;
