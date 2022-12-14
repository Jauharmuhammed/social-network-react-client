import { useChangePassowrdMutation } from "app/api/authApiSlice";
import { closeChangePassword, openLogin } from "features/auth/services/authModalSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import errorToast from "utils/toasts/errorToast";
import successToast from "utils/toasts/successToast";
import ButtonSpinner from "../../../components/ButtonSpinner";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import Input from "./Input";
import Modal from "./Modal";

const ChangePasswordModal = ({ uid }) => {
    const changePasswordOverlay = useSelector((state) => state.authModal.changePasswordModal);
    const navigate = useNavigate();

    const [changePassword, { isLoading }] = useChangePassowrdMutation();

    // regex for password validation
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,24}$/;

    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        if (!result && password) {
            setPasswordErr(`8 to 24 characters
Must include uppercase and lowercase letters, a number and a special character`);
        } else {
            setPasswordErr("");
        }
    }, [password]);


    // function request to change the password
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading || !PWD_REGEX.test(password)) return;

        if (!password || !confirmPassword) {
            setErrMsg("Fields cannot be empty.");
            return;
        }

        if (password !== confirmPassword) {
            setErrMsg("Passwords do not match.");
            return;
        }

        console.log(uid);

        try {
            const response = await changePassword({ password,confirm_password: confirmPassword,uid,}).unwrap();
            console.log(response);

            successToast('Password changed successfully.')
            dispatch(openLogin());
            navigate("/");
        } catch (err) {
            console.log(err);
            setErrMsg(err);

            // if anything goes wrong or verification failed just navigate to home
            navigate("/");

            errorToast("An error occured!, Please contact customer support");
        }
    };

    // set error message to null when inputs changes
    useEffect(() => {
        setErrMsg("");
    }, [password, confirmPassword]);

    return (
        <Modal
            id="loginModalContainer"
            active={changePasswordOverlay}
            closeActive={() => dispatch(closeChangePassword())}>
            <div className="flex flex-col items-center">
                <h3 className="font-semibold text-xl my-5">Change your password</h3>
                <form className="w-full" onSubmit={handleSubmit} autoComplete="none">
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={passwordErr ? "border-red-700" : ""}
                        error={passwordErr}
                    />
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <ErrorMessage error={errMsg} />
                    <Button disabled={isLoading} content={isLoading ? <ButtonSpinner /> : "Change Password"} />
                </form>
            </div>
        </Modal>
    );
};

export default ChangePasswordModal;
