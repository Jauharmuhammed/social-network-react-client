import React from "react";
import { useSelector } from "react-redux";
import EmailButton from "./EmailButton";
import Modal from "./Modal";

const EmailVerificationModal = () => {
    const email = useSelector((state) => state.auth.newUser.email);
    const emailOverlay = useSelector((state) => state.authModal.emailModal);

    return (
        <Modal active={emailOverlay}>
            <div className="flex flex-col items-center">
                <h1 className="font-boogaloo text-custom-yellow text-5xl pb-2 mt-4">showyourwork</h1>
                <h3 className="font-semibold text-center text-xl mt-8">
                    Almost There! <br />
                    Check your inbox.
                </h3>

                <p className=" text-center my-7">
                    Confirm your identity by clicking the link send to <span className="text-blue-500">{email}</span>
                </p>

                <EmailButton email={email} />
            </div>
        </Modal>
    );
};

export default EmailVerificationModal;
