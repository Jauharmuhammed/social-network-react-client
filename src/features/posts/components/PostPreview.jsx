import {useGetSinglePostMutation} from "app/api/postApiSlice";
import {useFollowUserMutation} from "app/api/usersApiSlice";
import BackdropSpinner from "components/BackdropSpinner";
import Button from "components/Button";
import {ProfileCard} from "features/users";
import React, {useEffect} from "react";
import {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import imageToast from "utils/toasts/imageToast";

const PostPreview = ({postId}) => {
    const [post, setPost] = useState({});
    const user = useSelector((state) => state.auth.user);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [followUser] = useFollowUserMutation();
    const navigate = useNavigate();

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
            setIsInitialLoading(false)
            fetchSingePost(postId);

            if (response === 'User followed'){
                imageToast({
                    imageUrl: post?.user_profile?.profile_pic,
                    text: 'Following! Their posts will show up in your home feed!'
                })
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchSingePost(postId);
    }, []);



    return (
        <div className="min-h-[700px] bg-[#323232] rounded-3xl my-8 xl:mx-24 p-5 text-white flex gap-10">
            {isLoading  && isInitialLoading ? (
                <BackdropSpinner />
            ) : (
                <>
                    <div className=" w-100 md:w-2/5 relative rounded-3xl  h-fit overflow-hidden">
                        <img src={post?.image} alt={post?.title} className=" object-cover w-full h-full" />
                    </div>
                    <div className="md:w-3/5 flex flex-col gap-4">
                        <Button primary text="Save" className="place-self-end" />
                        <h1 className="text-5xl">{post?.title}</h1>

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
                    </div>
                </>
            )}
        </div>
    );
};

export default PostPreview;
