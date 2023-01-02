import Button from "components/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openCollectionChange } from "../services/postModalSlice";

const Post = ({ post }) => {
    const collections = useSelector((state) => state.auth.collections);
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    function handleClick(e) {
        if (e.target.id === "singlePostContainer") {
            navigate(`/post/${post.id}`);
        }
    }
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            id="singlePost"
            onClick={handleClick}
            className="min-w-[150px] min-h-[150px] w-full h-fit mb-2 cursor-pointer transition-all duration-300 flex flex-col gap-1">
            <div className="w-full h-[95%] relative rounded-3xl overflow-hidden transition-all duration-300 ">
                <img
                    className="w-full h-full min-h-[150px] object-cover "
                    src={post?.image}
                    alt={post?.title}
                />
                {hover && (
                    <div
                        id="singlePostContainer"
                        className="absolute flex flex-col justify-between z-10 inset-0 p-2 text-white bg-black bg-opacity-50 transition-all duration-300">
                        <div id="savePost" className="flex justify-between items-center max-w-full">
                            <div onClick={()=> dispatch(openCollectionChange())} className="flex items-center max-w-[75%]">
                                <p className="ml-2 text-sm whitespace-nowrap max-w overflow-hidden text-ellipsis">{collections[0]?.name}</p>
                                <span
                                    className="cursor-pointer rotate-90">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1.5em"
                                        height="1.5em"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <Button
                                primary
                                text="Save"
                                className="text-darkgray bg-custom-yellow hover:bg-opacity-90 px-2 py-1"
                            />
                        </div>
                        <div
                            id="postProfile"
                            className="flex justify-between bg-slate-200 bg-opacity-30 p-1 rounded-3xl">
                            <div
                                onClick={() => navigate(`/${post?.user_profile?.username}`)}
                                className="flex justify-start items-center gap-1 ">
                                <img
                                    className="w-7 aspect-square rounded-full object-cover "
                                    src={post?.user_profile?.profile_pic}
                                    alt={`${post?.user_profile?.username} profile`}
                                />
                                <p className="text-sm text-ellipsis overflow-hidden">
                                    {post?.user_profile?.full_name}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1.9em"
                                        height="1.9em"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m2 14v-3c-3.61 0-6.19 1.43-8 4c.72-3.67 2.94-7.27 8-8V6l5 5l-5 5Z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <p className="text-white p-2 font-medium text-ellipsis overflow-hidden ">
                {post?.title}
            </p>
        </div>
    );
};

export default Post;
