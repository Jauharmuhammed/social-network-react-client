import { useGetUserDetailsMutation, useUpdateUserDetailsMutation } from "app/api/usersApiSlice";
import { data } from "autoprefixer";
import Button from "components/Button";
import { baseUrl } from "lib/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import errorToast from "utils/toasts/errorToast";
import { setUserDetails } from "../services/userSlice";
import axios from "../../../lib/axios";
import { useNavigate } from "react-router-dom";
import BackdropSpinner from "components/BackdropSpinner";

const EditProfile = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const userDetails = useSelector((state) => state.user.details);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const NUMBER_REGEX = /^[0-9]$/;
    const MOBILE_REGEX = /^[0-9]{10}$/;

    const [isUpdateLoading, setIsUpdateLoading] = useState(false);

    const [image, setImage] = useState(null);
    const [mobile, setMobile] = useState("");
    const [firstName, setFirstName] = useState(
        userDetails?.first_name ? userDetails?.first_name : ""
    );
    const [lastName, setLastName] = useState(userDetails?.last_name ? userDetails?.last_name : "");
    const [newUsername, setNewUsername] = useState(
        userDetails?.username ? userDetails?.username : ""
    );
    const [bio, setBio] = useState(userDetails?.bio ? userDetails?.bio : "");

    const [getUserDetails, { isLoading }] = useGetUserDetailsMutation();

    async function fetchData() {
        try {
            const response = await getUserDetails({ username: user?.username }).unwrap();
            console.log(response);
            dispatch(setUserDetails(response));
        } catch (err) {
            console.log(err);
        }
    }

    async function handleUpdateUser() {
        if (mobile !== "" && !MOBILE_REGEX.test(mobile)) {
            errorToast("Please Enter a valid phone number");
            return;
        }
        setIsUpdateLoading(true);
        const data = new FormData();

        console.log(userDetails);

        data.append("id", user?.user_id);
        data.append("first_name", firstName);
        data.append("last_name", lastName);
        data.append("username", newUsername);
        data.append("mobile_number", mobile);
        data.append("bio", bio);
        image && data.append("profile_picture", image);

        try {
            const res = await axios.post("/profile/update/", data, {
                headers: {
                    Authorization: `Bearer ${token?.access}`,
                },
            });
            setIsUpdateLoading(false);
            console.log(res);
            dispatch(setUserDetails(res.data));
            navigate(`/${res.data.username}`);
        } catch (err) {
            console.log(err);
            setIsUpdateLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [user]);

    function handleMobileNumberChange(e) {
        if (e.target.value.length > 10) return;
        if (NUMBER_REGEX.test(e.target.value.slice(-1)) || e.target.value.slice(-1) === "") {
            setMobile(e.target.value);
        }
    }

    useEffect(() => {
        setMobile(userDetails?.mobile_number ? userDetails?.mobile_number : "");
        setFirstName(userDetails?.first_name ? userDetails?.first_name : "");
        setLastName(userDetails?.last_name ? userDetails?.last_name : "");
        setNewUsername(userDetails?.username ? userDetails?.username : "");
        setBio(userDetails?.bio ? userDetails?.bio : "");
    }, [userDetails]);

    return (
        user && (
            <>
            {isUpdateLoading && <BackdropSpinner/>} 
                <div className="w-100 flex flex-col sm:flex-row justify-start items-center px-3 py-5 md:py-10 gap-3 sm:gap-10  text-gray-100 ">
                    <div className="flex flex-col gap-4 items-center">
                        <img
                            className="w-28 sm:w-56 aspect-square max-h-56 rounded-full object-cover"
                            src={image ? URL.createObjectURL(image) : userDetails?.profile_pic}
                            alt={`${userDetails?.username} profile`}
                        />
                        <label
                            htmlFor="profileImage"
                            className="py-2 px-4 rounded-full border cursor-pointer">
                            Change
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            hidden
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center sm:items-start w-full px-5 md:w-max">
                        <div className="flex gap-3 flex-col md:flex-row w-full">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="first_name " className="text-gray-500">
                                    First Name
                                </label>
                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    id="first_name"
                                    placeholder="First Name"
                                    type="text"
                                    className="bg-transparent outline-none border rounded-full py-2 px-4"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="last_name " className="text-gray-500">
                                    Last Name
                                </label>
                                <input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    id="last_name"
                                    type="text"
                                    placeholder="Last Name"
                                    className="bg-transparent outline-none border rounded-full py-2 px-4"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full mt-3">
                            <label htmlFor="username " className="text-gray-500">
                                Username
                            </label>
                            <input
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                id="username"
                                placeholder="username"
                                type="text"
                                className="bg-transparent outline-none border rounded-full py-2 px-4"
                            />
                            <p className="text-xs text-gray-500">
                                {window.location.origin}/{newUsername}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1 w-full mt-3">
                            <label htmlFor="bio " className="text-gray-500">
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                id="bio"
                                className="bg-transparent border rounded-3xl w-full outline-none py-2 px-3"
                                placeholder="Tell people who you are?"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows="10"></textarea>
                        </div>
                        <div className="flex flex-col gap-1 w-full mt-3">
                            <label htmlFor="mobile " className="text-gray-500  mt-3">
                                Mobile
                            </label>
                            <input
                                value={mobile}
                                onChange={handleMobileNumberChange}
                                placeholder="Mobile Number"
                                id="mobile"
                                type="text"
                                className="bg-transparent outline-none border rounded-full py-2 px-4 w-full"
                            />
                        </div>
                        <div className="flex justify-end w-full">
                            <Button onClick={handleUpdateUser} text="save" className="mt-5 " />
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default EditProfile;
