import React, { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeLogin, closeSignup, openEmail, openLogin } from "features/auth/services/authModalSlice";
import { BiErrorCircle } from "react-icons/bi";
import GoogleAuth from "./GoogleAuth";
import { useRegisterMutation } from "app/api/authApiSlice";
import ButtonSpinner from "../../../components/ButtonSpinner";
import { setNewUser } from "features/auth/services/authSlice";
import successToast from "utils/toasts/successToast";
import PasswordEye from "./PasswordEye";

const SignupModal = () => {
    const signupOverlay = useSelector((state) => state.authModal.signupModal);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();


    // regex for email and password validation
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,24}$/;

    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");

    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const [errMsg, setErrMsg] = useState("");

    // validate and update error message email when input changes
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        if (!result && email) {
            setEmailErr("Please enter a valid email address.");
        } else {
            setEmailErr("");
        }
    }, [email]);

    // validate and update error message password when input changes
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        if (!result && password) {
            setPasswordErr(`
      8 to 24 characters
      Must include uppercase and lowercase letters, a number and a special character
      Allowed special characters: ! @ # $ % 
      `);
        } else {
            setPasswordErr("");
        }
    }, [password]);

    // set error message to null when input and password changes
    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if the request is waiting return nothing
        if (isLoading) return;

        // if values not accurate set error messages
        const v1 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(password);
        if (!v1 || !v3) {
            if (!email || !password) {
                if (!email) {
                    setEmailErr("This field is required");
                }
                if (!password) {
                    setPasswordErr("This field is required");
                }
                return;
            }
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const userData = await register({ email, password }).unwrap();
            console.log(userData);

            successToast("Account created successfully");

            // close modals
            dispatch(closeLogin());
            dispatch(closeSignup());

            // save email in a state for the email verification modal to use in link
            dispatch(setNewUser(email));

            // open email send modal
            dispatch(openEmail());

            //clear state
            setEmail("");
            setPassword("");
        } catch (err) {
            console.log(err);
            if (!err?.data) {
                setErrMsg("No Server Response");
            } else if (err.data?.email) {
                setEmailErr("An account already exists with this email");
            } else {
                setErrMsg("Registration failed, Please try again.");
            }
        }
    };

    // close the modal if click outside of it
    const handlClose = (e) => {
        if (e.target.id === "signupModalContainer") dispatch(closeSignup());
    };

    return (
        // modal container
        <div
            id="signupModalContainer"
            onClick={handlClose}
            className={
                (signupOverlay ? "flex" : "hidden") +
                " fixed  inset-0 bg-black bg-opacity-40 backdrop-blur-sm  justify-center items-center"
            }>
            {/* modal */}
            <div
                className={
                    (signupOverlay ? "opacity-100" : "translate-y-96 opacity-0") +
                    " transform w-[450px] h-fit relative rounded-[2rem] bg-black back text-white p-12 transition-transform duration-1000  mt-16"
                }>
                <div className="flex flex-col items-center">
                    <h1 className="font-boogaloo text-custom-yellow text-5xl pb-2 mt-4">showyourwork</h1>
                    <h3 className="font-semibold text-xl mt-3">Signup</h3>
                    <form className="w-full" onSubmit={handleSubmit} autoComplete="none">
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            autoComplete="none"
                            autoFocus
                            className={`w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300 mt-5 mb-5 ${
                                emailErr ? "border-red-700" : " "
                            }`}
                        />
                        {emailErr && (
                            <p className="text-red-700 -mt-4 mb-1 flex ml-2 items-center text-sm">
                                <BiErrorCircle />
                                &nbsp;{emailErr}
                            </p>
                        )}

                        <div className="w-full h-fit relative">
                            <input
                                type={passwordVisibility ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300 mb-5 ${
                                    passwordErr ? "border-red-700" : ""
                                }`}
                            />
                            {passwordErr && (
                                <p className="text-red-700 my-1 flex items-start ml-2 text-sm -mt-4">
                                    <span className="text-base mt-0.5 mr-1">
                                        <BiErrorCircle />
                                    </span>
                                    <span>
                                        must be 8 to 24 characters.
                                        <br />
                                        must include uppercase and lowercase letters, a number and a special character.
                                    </span>
                                </p>
                            )}
                            {errMsg && (
                                <p className="text-red-700 my-1 flex justify-center items-start ml-2 text-sm -mt-4">
                                    <span className="text-base mt-0.5 mr-1">
                                        <BiErrorCircle />
                                    </span>
                                    <span>{errMsg}</span>
                                </p>
                            )}
                            <PasswordEye
                                visible={passwordVisibility}
                                handleVisibility={() => setPasswordVisibility(!passwordVisibility)}
                            />
                        </div>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full rounded-3xl  py-3 px-4 bg-custom-yellow text-black font-semibold outline-none">
                            {isLoading ? <ButtonSpinner /> : "Signup"}
                        </button>
                    </form>
                    <p className="py-3 font-semibold">OR</p>
                    <button className="w-full rounded-3xl min-h-[44px] relative bg-transparent font-semibold outline-none flex items-center justify-center ">
                        {signupOverlay && <GoogleAuth />}
                    </button>
                    <p className="text-xs text-center mx-6 my-4">
                        By continuing, you agree to Showyourworks&apos; <br />
                        <strong>Terms of Service</strong> and acknowledge that you&apos;ve read our{" "}
                        <strong>Privacy Policy</strong>
                    </p>
                    <p className="text-sm text-center ">
                        Already a member?
                        <strong onClick={() => dispatch(openLogin())} className="cursor-pointer">
                            Login
                        </strong>
                    </p>
                </div>
                <IoCloseSharp
                    className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
                    onClick={() => dispatch(closeSignup())}
                />
            </div>
        </div>
    );
};

export default SignupModal;
