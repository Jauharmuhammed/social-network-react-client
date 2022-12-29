import { useGetSinglePostMutation } from "app/api/postApiSlice";
import { useFollowUserMutation } from "app/api/usersApiSlice";
import BackdropSpinner from "components/BackdropSpinner";
import Button from "components/Button";
import { ProfileCard } from "features/users";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { BiLink } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageToast from "utils/toasts/imageToast";
import customToast from "utils/toasts/customToast";
import Menu from "./Menu";
import Comments from "./Comments";
import Tags from "./Tags";
import EditPostModal from "./EditPostModal";
import DeletePostModal from "./DeletePostModal";

const PostPreview = ({ postId }) => {
    const [post, setPost] = useState({});
    const user = useSelector((state) => state.auth.user);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [followUser] = useFollowUserMutation();
    const navigate = useNavigate();

    const [edit, setEdit] = useState(false);
    const [postDelete, setPostDelete] = useState(false);

    const [showMenu, setShowMenu] = useState(false);

    const [getSinglePost, { isLoading }] = useGetSinglePostMutation();

    async function fetchSingePost(id) {
        try {
            const response = await getSinglePost({ id }).unwrap();
            console.log(response);
            setPost(response);
        } catch (err) {
            console.log(err);
            navigate("/notfound");
        }
    }

    async function handleFollow() {
        try {
            const response = await followUser({ username: post.user_profile?.username }).unwrap();
            console.log(response);
            setIsInitialLoading(false);
            fetchSingePost(postId);

            if (response === "User followed") {
                imageToast({
                    imageUrl: post?.user_profile?.profile_pic,
                    text: "Following! Their posts will show up in your home feed!",
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!edit) fetchSingePost(postId);
    }, [edit]);

    // fucntion to copy the current link and add to clipboard
    function handleCopyLink() {
        window.navigator.clipboard.writeText(window.location.href);
        customToast({
            imageUrl: post?.image,
            text: "Link copied to clipboard",
        });
    }

    return (
        <div className="min-h-[700px] bg-[#323232] sm:rounded-3xl sm:my-8 xl:mx-24 p-5 text-white flex flex-col sm:flex-row gap-4 sm:gap-10">
            {isLoading && isInitialLoading ? (
                <BackdropSpinner />
            ) : (
                <>
                    <div className=" w-100 md:w-2/5 relative rounded-3xl  h-fit overflow-hidden">
                        <img
                            src={post?.image}
                            alt={post?.title}
                            className=" object-cover w-full h-full"
                        />
                    </div>
                    <div className="md:w-3/5 flex flex-col  gap-4">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4">
                                <div className="relative">
                                    <BsThreeDotsVertical
                                        onClick={() => setShowMenu((prev) => !prev)}
                                        size={"1.3rem"}
                                        className="cursor-pointer"
                                    />
                                    {showMenu && (
                                        <Menu
                                            post={post}
                                            id="postMenuToggleButton"
                                            showMenu={showMenu}
                                            setShowMenu={setShowMenu}
                                            setEdit={setEdit}
                                            setPostDelete={setPostDelete}
                                        />
                                    )}
                                </div>
                                <IoShareOutline size={"1.3rem"} className="cursor-pointer" />
                                <BiLink
                                    onClick={handleCopyLink}
                                    size={"1.3rem"}
                                    className="cursor-pointer"
                                />
                            </div>
                            <Button primary text="Save" className="" />
                        </div>
                        <h1 className="text-5xl mt-1 sm:mt-5">{post?.title}</h1>
                        {post?.location && <div className="flex gap-1 items-center">
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5z"
                                    />
                                </svg>
                            </span>
                            <span>{post?.location}</span>
                        </div>}

                        <p>{post?.description}</p>
                        <div className="flex justify-between">
                            <ProfileCard
                                imgUrl={post?.user_profile?.profile_pic}
                                name={post?.user_profile?.full_name}
                                followers={post?.user_profile?.followers_count}
                                onClick={() => navigate(`/${post?.user_profile?.username}`)}
                            />
                            {user.user_id !== post?.user && (
                                <div className="py-2 flex gap-5">
                                    {post?.user_profile?.followers?.some(
                                        (follower) => follower === user.user_id
                                    ) ? (
                                        <Button primary text="Following" onClick={handleFollow} />
                                    ) : (
                                        <Button text="Follow" onClick={handleFollow} />
                                    )}
                                </div>
                            )}
                        </div>
                        <Tags tags={post?.tags} />
                        <Comments post={post} />
                    </div>
                </>
            )}
            {edit && <EditPostModal post={post} setPost={setPost} edit={edit} setEdit={setEdit} />}
            {postDelete && <DeletePostModal post={post} setPost={setPost} postDelete={postDelete} setPostDelete={setPostDelete} />}
        </div>
    );
};

export default PostPreview;
