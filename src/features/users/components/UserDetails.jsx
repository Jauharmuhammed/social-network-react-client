import {useFollowUserMutation, useGetUserDetailsMutation} from "app/api/usersApiSlice";
import BackdropSpinner from "components/BackdropSpinner";
import Button from "components/Button";
import ButtonSpinner from "components/ButtonSpinner";
import {Error404} from "pages";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUserDetails} from "../services/userSlice";

const UserDetails = ({username}) => {
    const user = useSelector((state) => state.user.details);
    const [getUserDetails, {isLoading}] = useGetUserDetailsMutation();
    const [followUser , {isFetching}] = useFollowUserMutation();
    const dispatch = useDispatch();

    async function fetchData() {
        try {
            const response = await getUserDetails({username}).unwrap();
            console.log(response);
            dispatch(setUserDetails(response));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function handleFollow() {
        try {
            const response = await followUser({username}).unwrap();
            console.log(response);
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }

    // if (isLoading) return <BackdropSpinner />;

    if (!user && !isLoading) return <Error404 text="User Not Found!" />;

    return (
        user && (
            <div className="w-100 flex justify-start py-10 gap-10  text-gray-100 ">
                <img
                    className="w-56 aspect-square max-h-56 rounded-full object-cover"
                    src={user?.profile_pic}
                    alt={`${user?.username} profile`}
                />
                <div className="flex flex-col justify-center">
                    <h1 className="text-5xl font-bold ">{user?.full_name}</h1>
                    <p className="text-gray-400 pl-1">@{user?.username}</p>
                    <div className="font-600 pl-1">
                        <span>{user?.followers_count} followers</span>
                        <strong>&nbsp;&#183;&nbsp;</strong>
                        <span>{user?.followings_count} following</span>
                    </div>
                    {user?.is_current_user ? (
                        <div className="py-2 flex gap-5">
                            <Button text={"Edit Profile"} />
                        </div>
                    ) : (
                        <div className="py-2 flex gap-5">
                            {user.is_following ? (
                                <Button primary text={"Following"} onClick={handleFollow} />
                            ) : (
                                <Button text={isFetching ? <ButtonSpinner/> : 'Follow'} onClick={handleFollow} />
                            )}
                            <Button text={"Message"} />
                        </div>
                    )}
                </div>
            </div>
        )
    );
};

export default UserDetails;
