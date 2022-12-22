import Button from "components/Button";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Post = ({post}) => {
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    function handleClick(e) {
        console.log(e.target.id);
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
                <img className="w-full h-full min-h-[150px] object-cover " src={post?.image} alt={post?.title} />
                {hover && (
                    <div
                        id="singlePostContainer"
                        className="absolute flex flex-col justify-between z-10 inset-0 p-2 text-white bg-black bg-opacity-50 transition-all duration-300">
                        <div id="savePost" className="flex justify-between items-center">
                            <p className="ml-3">Collection</p>
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
                                <p className="text-sm text-ellipsis overflow-hidden">{post?.user_profile?.full_name}</p>
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
            <p className="text-white p-2 font-medium text-ellipsis overflow-hidden ">{post?.title}</p>
        </div>
    );
};

export default Post;
