import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeLogin, openForgotPassword, openLoginWithOtp, openSignup } from "features/auth/services/authModalSlice";
import GoogleAuth from "./GoogleAuth";
import { useLoginMutation } from "app/api/authApiSlice";
import { setCredentials } from "features/auth/services/authSlice";
import ButtonSpinner from "../../../components/ButtonSpinner";
import PasswordEye from "./PasswordEye";
import successToast from "utils/toasts/successToast";
import Button from "./Button";
import Input from "./Input";
import ErrorMessage from "./ErrorMessage";
import Modal from "./Modal";

const LoginModal = () => {
    const loginOverlay = useSelector((state) => state.authModal.loginModal);
    const signupOverlay = useSelector((state) => state.authModal.signupModal);

    const [login, { isLoading }] = useLoginMutation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const dispatch = useDispatch();

    const [errMsg, setErrMsg] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    // regex for email validation
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // validate and update error message email when input changes
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        if (!result && email) {
            setEmailErr("Please enter a valid email address.");
        } else {
            setEmailErr("");
        }
    }, [email]);

    // set error message to null when inputs changes
    useEffect(() => {
        setErrMsg("");
    }, [email, password]);


    // login function
    const loginUser = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        const emailValidation = EMAIL_REGEX.test(email);
        if (!emailValidation || !password) {
            if (!emailValidation) {
                setEmailErr("This field is required");
            }

            if (!password) {
                setPasswordErr("This field is required");
            }
            return;
        }

        try {
            const response = await login({ email, password }).unwrap();
            console.log(response);
            dispatch(setCredentials(response));
            dispatch(closeLogin());
            successToast("Logged in successfully.");

            // clear state
            setEmail("");
            setPassword("");
        } catch (err) {
            console.log(err);
            if (!err?.data) {
                setErrMsg("No Server Response");
            } else if (err.status === 401) {
                setErrMsg("No active account found with the given credentials");
            } else {
                setErrMsg("Email or password is incorrect.");
            }
        }
    };

    // handle otp modal
    const handleOpenOTP = () => {
        dispatch(openLoginWithOtp());
        dispatch(closeLogin());
    };

    return (
        <Modal id='loginModalContainer' active={loginOverlay} closeActive={()=>dispatch(closeLogin())}>
                <div className="flex flex-col items-center">
                    <h1 className="font-boogaloo text-custom-yellow text-5xl pb-2 mt-4">showyourwork</h1>
                    <h3 className="font-semibold text-xl my-3">Login</h3>
                    <form onSubmit={loginUser} className="w-full text-center">
                        <Input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailErr ? "border-red-700" : "border-white "}
                            error={emailErr}
                        />

                        <div className="w-full h-fit relative">
                            <Input
                                type={passwordVisibility ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={passwordErr ? "border-red-700" : "border-white"}
                                error={passwordErr}
                            />
                            <PasswordEye
                                visible={passwordVisibility}
                                onClick={() => setPasswordVisibility(!passwordVisibility)}
                            />
                        </div>
                        <ErrorMessage error={errMsg} />

                        <div className="flex justify-center gap-5 mb-5">
                            <p
                                className="font-medium text-sm cursor-pointer"
                                onClick={() => dispatch(openForgotPassword())}>
                                Forgot Password?
                            </p>
                            <p className="font-medium text-sm cursor-pointer" onClick={handleOpenOTP}>
                                Login With OTP
                            </p>
                        </div>
                        <Button disabled={isLoading} content={isLoading ? <ButtonSpinner /> : "Login"} />
                    </form>
                    <p className="py-3 font-semibold">OR</p>
                    <button className="w-full rounded-3xl min-h-[44px] relative  bg-transparent outline-none flex items-center justify-center">
                        {!signupOverlay && <GoogleAuth />}
                    </button>

                    <p className="text-xs text-center mx-6 my-4">
                        By continuing, you agree to Showyourworks&apos; <br />
                        <strong>Terms of Service</strong> and acknowledge that you&apos;ve read our
                        <strong>Privacy Policy</strong>
                    </p>
                    <p className="text-sm text-center ">
                        Not on Showyourwork yet?
                        <strong onClick={() => dispatch(openSignup())} className="cursor-pointer">
                            Sign up
                        </strong>
                    </p>
                </div>
        </Modal>
    );
};

export default LoginModal;
