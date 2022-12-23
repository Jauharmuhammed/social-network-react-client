import { useLoginWithOtpMutation, useSendOtpMutation } from "app/api/authApiSlice";
import { closeLoginWithOtp, openLogin } from "features/auth/services/authModalSlice";
import { setCredentials } from "features/auth/services/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import successToast from "utils/toasts/successToast";
import ButtonSpinner from "../../../components/ButtonSpinner";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import Input from "./Input";
import Modal from "./Modal";

const MobileVerificationModal = () => {
    const [otpSend, setOtpSend] = useState(false);
    const loginWithOtOverlay = useSelector((state) => state.authModal.loginWithOtpModal);

    // regex for mobilea and otp validation
    const MOBILE_REGEX = /^[0-9]{10}$/;
    const OTP_REGEX = /^[0-9]{6}$/;

    const [mobile, setMobile] = useState("");
    const [mobileErr, setMobileErr] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [otp, setOtp] = useState("");
    const [otpErr, setOtpErr] = useState("");

    const [sendOtp, { isLoading }] = useSendOtpMutation();
    const [loginWithOtp, { isLoading : isLoginLoading }] = useLoginWithOtpMutation();

    const dispatch = useDispatch();


    // validating the mobile number when the input changes
    useEffect(() => {
        const result = MOBILE_REGEX.test(mobile);
        if (!result && mobile) {
            setMobileErr("Please enter a 10 digit mobile number.");
        } else {
            setMobileErr("");
        }
    }, [mobile]);


    // validating the otp when the input changes
    useEffect(() => {
        const result = OTP_REGEX.test(otp);
        if (!result && otp) {
            setOtpErr("OTP must be a 6 digit number");
        } else {
            setOtpErr("");
        }
    }, [otp]);

    // set error message to null when inputs changes
    useEffect(() => {
        setErrMsg("");
    }, [mobile, otp]);

    //function to send otp
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mobile) {
            setMobileErr("This field is required");
            return;
        }
        if (!MOBILE_REGEX.test(mobile)) return;

        try {
            const response = await sendOtp({ mobile_number: mobile }).unwrap();
            console.log(response);
            setOtpSend(true);
        } catch (err) {
            setErrMsg(err.data);
        }
    };

    // function to validate otp and login the user
    const handleLoginWithOtp = async (e) => {
        e.preventDefault();
        if (!otp) {
            setOtp("This field is required");
            return;
        }
        if (!OTP_REGEX.test(otp)) return;

        try {
            const response = await loginWithOtp({otp,mobile_number: mobile,}).unwrap();
            console.log(response);
            dispatch(setCredentials(response));
            dispatch(closeLoginWithOtp());

            successToast('Logged in successfully.')

            // clear state
            setMobile("");
            setOtp("");
        } catch (err) {
            setErrMsg(err.data);
        }
    };

    // function handling back to login page
    const handleGoBack = () => {
        dispatch(closeLoginWithOtp());
        dispatch(openLogin());
    };

    return (
        <Modal id="loginModalContainer" active={loginWithOtOverlay} closeActive={() => dispatch(closeLoginWithOtp())}>
            <div className="flex flex-col items-center">
                <h3 className="font-semibold text-xl mt-3">Login With OTP</h3>
                {!otpSend ? (
                    <>
                        <p className="text-sm text-center my-8">We'll send an OTP to your registered mobile number</p>
                        <form onSubmit={handleSubmit} className="w-full">
                            <Input
                                type="text"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Mobile Number"
                                autoComplete="on"
                                className={mobileErr ? "border-red-700" : "mb-5 "}
                                error={mobileErr}
                            />
                            <ErrorMessage error={errMsg} />
                            <Button disabled={isLoading} content={isLoading ? <ButtonSpinner /> : "Send OTP"} />
                        </form>
                        <p className="text-base font-semibold text-center my-4 cursor-pointer" onClick={handleGoBack}>
                            Go back
                        </p>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-center my-8">Enter OTP recieved in your mobile number</p>
                        <form onSubmit={handleLoginWithOtp} className="w-full">
                            <Input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="OTP"
                                pattern="\d{6}"
                                className={otpErr ? "border-red-700" : "mb-5 "}
                                error={otpErr}
                            />

                            <ErrorMessage error={errMsg} />

                            <Button
                                disabled={isLoginLoading}
                                content={isLoginLoading ? <ButtonSpinner /> : "Login With OTP"}
                            />
                        </form>
                        <p
                            className="text-base font-semibold text-center my-4 cursor-pointer"
                            onClick={() => setOtpSend(false)}>
                            Didn't recieved the OTP?
                        </p>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default MobileVerificationModal;
