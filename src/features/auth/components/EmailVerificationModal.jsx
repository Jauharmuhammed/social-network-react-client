import React from "react";
import { useSelector } from "react-redux";
import { FiExternalLink } from "react-icons/fi";

const EmailVerificationModal = () => {
    const email = useSelector((state) => state.auth.newUser.email);
    const emailOverlay = useSelector((state) => state.authModal.emailModal);

    return (
        <>
            <div
                className={
                    (emailOverlay ? "flex" : "hidden") +
                    " fixed  inset-0 bg-black bg-opacity-40 backdrop-blur-sm  justify-center items-center"
                }>
                {/* overlay */}
                <div
                    className={
                        (emailOverlay ? "opacity-100" : "translate-y-96 opacity-0") +
                        " transform w-[450px] h-fit relative rounded-[2rem] bg-black back text-white p-12 transition-transform duration-1000  mt-16"
                    }>
                    <div className="flex flex-col items-center">
                        <h1 className="font-boogaloo text-custom-yellow text-5xl pb-2 mt-4">showyourwork</h1>
                        <h3 className="font-semibold text-center text-xl mt-8">
                            Almost There! <br />
                            Check your inbox.
                        </h3>

                        <p className=" text-center my-7">
                            Confirm your identity by clicking the link send to{" "}
                            <span className="text-blue-500">{email}</span>
                        </p>

                        <div className="mb-5">
                            <a
                                className="rounded-md font-medium cursor-pointer  justify-center disabled:opacity-75 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400/70 active:translate-y-px transition duration-300 ease-out-smooth hidden sm:flex items-center w-full pointer-events-auto max-w-md hover:transition-none hover:shadow-[0px_0.125rem_0px_hsla(0turn,0%,100%,0.7)] hover:-translate-y-0.5 active:shadow-none bg-white hover:bg-gray-100 text-gray-800 border-transparent py-3 px-5 text-base"
                                href={`https://mail.google.com/mail/u/${email}/#search/from%3A(showyourworkonline%40gmail.com)+in%3Aanywhere+newer_than%3A1h`}
                                target="_blank"
                                rel="noreferrer">
                                <div className="flex items-center mr-4">
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1.33em"
                                            height="1em"
                                            preserveAspectRatio="xMidYMid meet"
                                            viewBox="0 0 256 193">
                                            <path
                                                fill="#4285F4"
                                                d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455h40.727Z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798v98.91Z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"
                                            />
                                            <path
                                                fill="#FBBC04"
                                                d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945l-16.292 12.218Z"
                                            />
                                            <path
                                                fill="#C5221F"
                                                d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23v23.273Z"
                                            />
                                        </svg>
                                    </span>
                                </div>
                                <span className="text-black mr-2">Open Gmail</span>
                                <span className="text-gray">
                                    <FiExternalLink />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailVerificationModal;
