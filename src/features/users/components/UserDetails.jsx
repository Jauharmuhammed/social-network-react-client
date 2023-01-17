import {useFollowUserMutation, useGetUserDetailsMutation} from "app/api/usersApiSlice";
import Button from "components/Button";
import ButtonSpinner from "components/ButtonSpinner";
import {Error404} from "pages";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUserDetails} from "../services/userSlice";

const UserDetails = ({username, edit, setEdit}) => {
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
    }, [username]);

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
            <div className="w-100 flex flex-col sm:flex-row justify-start items-center px-3 py-5 md:py-10 gap-3 sm:gap-10  text-gray-100 ">
                <img
                    className="w-28 sm:w-56 aspect-square max-h-56 rounded-full object-cover"
                    src={user?.profile_pic}
                    alt={`${user?.username} profile`}
                />
                <div className="flex flex-col justify-center items-center sm:items-start">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2">{user?.full_name}</h1>
                    <p className="text-gray-400">@{user?.username}</p>
                    <div className="font-600">
                        <span>{user?.followers_count} followers</span>
                        <strong>&nbsp;&#183;&nbsp;</strong>
                        <span>{user?.followings_count} following</span>
                    </div>
                    {user?.is_current_user ? (
                        <div className="py-2 flex gap-5">
                            <Button white text={"Edit Profile"} onClick={()=> setEdit(true)}/>
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
