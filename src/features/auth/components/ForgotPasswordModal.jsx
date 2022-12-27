import { useForgotPassowrdMutation } from "app/api/authApiSlice";
import { closeForgotPassword } from "features/auth/services/authModalSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonSpinner from "../../../components/ButtonSpinner";
import Button from "./Button";
import EmailButton from "./EmailButton";
import ErrorMessage from "./ErrorMessage";
import Input from "./Input";
import Modal from "./Modal";

const ForgotPasswordModal = () => {
    const forgotPasswordOverlay = useSelector((state) => state.authModal.forgotPasswordModal);

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [mailed, setMailed] = useState(false);

    const [forgotPassword, { isLoading }] = useForgotPassowrdMutation();

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

    // function requesting the link to reset password
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setEmailErr("This field is required");
            return;
        }
        if (!EMAIL_REGEX.test(email)) return;

        try {
            const response = await forgotPassword({ email }).unwrap();
            console.log(response);
            setMailed(true);
        } catch (err) {
            console.log(err?.data);
            setErrMsg(err?.data);
        }
    };

    // set error message to null when inputs changes
    useEffect(() => {
        setErrMsg("");
    }, [email]);

    return (
        <Modal
            id="forgotPasswordModalContainer"
            active={forgotPasswordOverlay}
            closeActive={() => dispatch(closeForgotPassword())}>
            <div className="flex flex-col items-center">
                {!mailed ? (
                    <>
                        <h3 className="font-semibold text-xl mt-3">Forgot your password?</h3>
                        <p className="text-sm text-center my-4">We'll send you a link to reset your password.</p>
                        <form onSubmit={handleSubmit} className="w-full">
                            <Input
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                className={emailErr ? "border-red-700" : "border-white "}
                                error={emailErr}
                            />

                            <ErrorMessage error={errMsg} />

                            <Button disabled={isLoading} content={isLoading ? <ButtonSpinner /> : "Continue"} />
                        </form>
                        <button
                            onClick={() => dispatch(closeForgotPassword())}
                            className=" mt-5 bg-transparent box-border text-white font-semibold outline-none">
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <p className=" text-center my-7">
                            Change your password by clicking the link send to{" "}
                            <span className="text-blue-500">{email}</span>
                        </p>

                        <EmailButton email={email} />
                    </>
                )}
            </div>
        </Modal>
    );
};

export default ForgotPasswordModal;
