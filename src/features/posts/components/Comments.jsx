import {useAddCommentMutation, useGetCommentsByPostMutation} from "app/api/postApiSlice";
import classNames from "classnames";
import Button from "components/Button";
import ButtonSpinner from "components/ButtonSpinner";
import React, {useEffect, useState} from "react";
import {useRef} from "react";
import {useSelector} from "react-redux";
import errorToast from "utils/toasts/errorToast";
import Comment from "./Comment";

const Comments = ({post}) => {
    const user = useSelector((state) => state.auth.user);
    const [toggle, setToggle] = useState(false);
    const commentRef = useRef();
    const [addComment, {isLoading}] = useAddCommentMutation();
    const [getCommetnsByPost] = useGetCommentsByPostMutation();
    const [comments, setComments] = useState([]);
    const [replyTo, setReplyTo] = useState(null);

    async function handleSubmit() {
        if (commentRef.current.value === "" || commentRef.current.value.trim() === `@${replyTo?.username}`) return;
        const mention = `@${replyTo?.username}`
        let data
        if ( commentRef.current.value.includes(mention) === false ){
            data ={
                user: user.user_id,
                post: post.id,
                body: commentRef.current.value,
            }
        } else {
            data = {
                parent: replyTo ? replyTo.id : "",
                user: user.user_id,
                post: post.id,
                body: commentRef.current.value.replace(`@${replyTo?.username} `, ""),
            }
        }
        try {
            const response = await addComment(data).unwrap();

            if (!replyTo) {
                setComments([response, ...comments]);
                setToggle(true);
            } else {
                fetchComments();
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
            console.log(response);
            setComments(response);
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

            {(toggle && comments.length) && (
                <ul className="list-none my-3 flex gap-3 flex-col">
                    {comments?.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            commentRef={commentRef}
                            setReplyTo={setReplyTo}
                            comments={comments}
                        />
                    ))}
                </ul>
            )}
            <div className="flex gap-2 items-center mb-10">
                <img className="w-10 aspect-square rounded-full object-cover" src={user?.profile_pic} alt={user?.username} />
                <input
                    ref={commentRef}
                    type="text"
                    className="bg-transparent w-full rounded-3xl border py-2 px-3 outline-none"
                    placeholder="Add a comment"
                    onKeyDown={handleBackspace}
                />

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
