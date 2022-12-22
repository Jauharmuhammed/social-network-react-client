import {useGetSinglePostMutation} from "app/api/postApiSlice";
import {useFollowUserMutation} from "app/api/usersApiSlice";
import BackdropSpinner from "components/BackdropSpinner";
import Button from "components/Button";
import {ProfileCard} from "features/users";
import React, {useEffect, useRef} from "react";
import {useState} from "react";
import { BiLink } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import imageToast from "utils/toasts/imageToast";
import uniqueToast from "utils/toasts/uniqueToast";

const PostPreview = ({postId}) => {
    const [post, setPost] = useState({});
    const user = useSelector((state) => state.auth.user);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [followUser] = useFollowUserMutation();
    const navigate = useNavigate();

    const [leftArrow, setLeftArrow] = useState(false);
    const [rightArrow, setRightArrow] = useState(false);

    const tag = useRef();

    const [getSinglePost, {isLoading}] = useGetSinglePostMutation();

    async function fetchSingePost(id) {
        try {
            const response = await getSinglePost({id}).unwrap();
            console.log(response);
            setPost(response);
        } catch (err) {
            console.log(err);
            navigate("/notfound");
        }
    }

    async function handleFollow() {
        try {
            const response = await followUser({username: post.user_profile?.username}).unwrap();
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
        fetchSingePost(postId);
    }, []);

    const scroll = (scrollOffset) => {
        tag.current.scrollLeft += scrollOffset

    };

    function handleScroll() {
        // if started scrolling show left arrow
        if (tag.current.scrollLeft > 0){
            setLeftArrow(true)
        }else{
            // if reached all the way to the left hide left arrow
            setLeftArrow(false)
        }

        
        if ((tag.current.scrollLeft + tag.current.clientWidth + 1 ) >= tag.current.scrollWidth){
            // if scrolled all the way to the right side 
            setRightArrow(false)
        }else{
            setRightArrow(true)
        }
        console.log(tag.current.scrollLeft);
        console.log(tag.current.clientWidth);
        console.log(tag.current.scrollWidth);

    }
    

    useEffect(() => {
        // coditionally render right arrow only if the tags exceeds the available space
        if ( tag.current.scrollWidth > tag.current.clientWidth) {
            setRightArrow(true);
        }
    }, [post]);

    function handleCopyLink() {
        window.navigator.clipboard.writeText(window.location.href)
        uniqueToast({
            imageUrl: post?.image,
            text: "Link copied to clipboard",
        })
    }

    return (
        <div className="min-h-[700px] bg-[#323232] rounded-3xl my-8 xl:mx-24 p-5 text-white flex gap-10">
            {isLoading && isInitialLoading ? (
                <BackdropSpinner />
            ) : (
                <>
                    <div className=" w-100 md:w-2/5 relative rounded-3xl  h-fit overflow-hidden">
                        <img src={post?.image} alt={post?.title} className=" object-cover w-full h-full" />
                    </div>
                    <div className="md:w-3/5 flex flex-col  gap-4">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4">
                                <BsThreeDotsVertical  size={'1.3rem'} className='cursor-pointer'/>
                                <IoShareOutline size={'1.3rem'} className='cursor-pointer'/>
                                <BiLink onClick={handleCopyLink} size={'1.3rem'} className='cursor-pointer'/>
                                </div>
                            <Button primary text="Save" className="" />
                            </div>
                        <h1 className="text-5xl mt-5">{post?.title}</h1>

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
                                    {post?.user_profile?.followers?.some((follower) => follower === user.user_id) ? (
                                        <Button primary text="Following" onClick={handleFollow} />
                                    ) : (
                                        <Button text="Follow" onClick={handleFollow} />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="relative w-full">
                            <ul
                                ref={tag}
                                onScroll={handleScroll}
                                className="postPreviewTags list-none flex gap-1.5 w-full overflow-x-scroll transition-all duration-150">
                                {post?.tags?.map((tag) => (
                                    <li
                                        className="px-3 py-1  bg-white text-darkgray bg-opacity-90 whitespace-nowrap rounded-3xl "
                                        key={tag}>
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                            {leftArrow && (
                                <div className="absolute left-0 top-0 bg-gradient-to-r from-darkgray to-transparent z-10 w-28 h-full flex justify-start items-center ">
                                    <span
                                        onClick={() => scroll(-200)}
                                        className="text-white rotate-180 rounded-full hover:bg-slate-100 hover:bg-opacity-20 cursor-pointer">
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
                            )}
                            {rightArrow && (
                                <div className="absolute right-0 top-0 bg-gradient-to-l from-darkgray to-transparent z-10 w-28 h-full flex justify-end items-center ">
                                    <span
                                        onClick={() => scroll(200)}
                                        className="text-white rounded-full hover:bg-slate-100 hover:bg-opacity-20 cursor-pointer">
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
                            )}
                        </div>
                        
                    </div>
                </>
            )}
        </div>
    );
};

export default PostPreview;
