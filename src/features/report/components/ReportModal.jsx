import { useReportPostMutation } from "app/api/reportApiSlice";
import Button from "components/Button";
import Modal from "components/Modal";
import { singlePost } from "features/posts/services/postSlice";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import errorToast from "utils/toasts/errorToast";
import successToast from "utils/toasts/successToast";
import { closeReportModal } from "../services/reportModalSlice";

const ReportModal = () => {
    const reportModalOverlay = useSelector((state) => state.reportModal.reportModal);
    const user = useSelector((state) => state.auth.user);
    const post = useSelector(singlePost);
    const dispatch = useDispatch();
    const type = useSelector((state) => state.report.type);
    const [reason, setReason] = useState("");
    const [question, setquestion] = useState("");

    const [reportPost, { isLoading }] = useReportPostMutation();
    const contentRef = useRef();

    async function handleReport() {
        const data = new FormData();
        data.append("reported_by", user.user_id);
        data.append("type", type);
        data.append("content", contentRef.current.value);
        data.append("user", post?.user);
        data.append("post", post?.id);
        try {
            const res = await reportPost({
                reported_by: user.user_id,
                reason: reason,
                type: type,
                content: contentRef.current.value,
                user: post?.user,
                post: post?.id,
            }).unwrap();
            console.log(res);
            successToast("Thank you for your feedback");
            dispatch(closeReportModal());
        } catch (err) {
            console.log(err);
            if (err?.data?.non_field_errors.length > 0) {
                errorToast("Your reported is already registered");
                dispatch(closeReportModal());
            }
        }
    }

    function handleSelectReason(e) {
        setReason(e.currentTarget.attributes["data-value"].value);
        console.log(e.currentTarget.attributes["data-value"].value);
    }
    useEffect(() => {
        switch (reason) {
            case "spam_or_fake":
                setquestion("How this is spam or fake?");
                break;
            case "hate_speech":
                setquestion("How this is hate speech?");
                break;
            case "adult_content":
                setquestion("How this is adult content?");
                break;
            case "intellectual_property_violation":
                setquestion("How this is an intellectual property violation?");
                break;
            case "not_liked":
                setquestion("");
                break;
            default:
                setquestion("");
        }
    }, [reason]);

    useEffect(() => {
        setReason("");
    }, [reportModalOverlay]);

    return (
        <Modal
            id="reportModal"
            active={reportModalOverlay}
            closeActive={() => dispatch(closeReportModal())}>
            <h3 className="text-center my-3 text-xl">Report</h3>
            {!reason && (
                <div>
                    <p className=" px-2 py-3">Why are you reporting this {type}?</p>
                    <ul className="text-gray-300 mb-3">
                        <li
                            onClick={handleSelectReason}
                            data-value="spam_or_fake"
                            className="w-full px-2 py-2 hover:bg-stone-700 rounded-md cursor-pointer flex justify-between ">
                            <span>Suspicious, spam or fake</span>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1.5em"
                                    height="1.5em"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                                    />
                                </svg>
                            </span>
                        </li>
                        <li
                            onClick={handleSelectReason}
                            data-value="hate_speech"
                            className="w-full px-2 py-2 hover:bg-stone-700 rounded-md cursor-pointer flex justify-between">
                            <span>Hateful speech or symbol</span>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1.5em"
                                    height="1.5em"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                                    />
                                </svg>
                            </span>
                        </li>
                        <li
                            onClick={handleSelectReason}
                            data-value="adult_content"
                            className="w-full px-2 py-2 hover:bg-stone-700 rounded-md cursor-pointer flex justify-between">
                            <span>Adult content</span>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1.5em"
                                    height="1.5em"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                                    />
                                </svg>
                            </span>
                        </li>
                        <li
                            onClick={handleSelectReason}
                            data-value="intellectual_property_violation"
                            className="w-full px-2 py-2 hover:bg-stone-700 rounded-md cursor-pointer flex justify-between">
                            <span>Intellectual property violation</span>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1.5em"
                                    height="1.5em"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                                    />
                                </svg>
                            </span>
                        </li>
                        <li
                            onClick={handleSelectReason}
                            data-value="not_liked"
                            className="w-full px-2 py-2 hover:bg-stone-700 rounded-md cursor-pointer flex justify-between">
                            <span>I don't want to see this</span>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1.5em"
                                    height="1.5em"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                                    />
                                </svg>
                            </span>
                        </li>
                    </ul>
                </div>
            )}
            {reason && (
                <div className="p-2">
                    {question ? (
                        <>
                            <p>{question}</p>
                            <textarea
                                ref={contentRef}
                                className="w-full bg-transparent border p-2 my-2 outline-none"
                                placeholder="write here...."
                                name="content"
                                id="content"
                                rows="4"></textarea>
                        </>
                    ) : (
                        <p>Are you sure that you want report this {type}?</p>
                    )}
                    <div className="flex justify-end gap-2 my-2">
                        <Button text="Cancel" onClick={() => dispatch(closeReportModal())} />
                        <Button
                            onClick={handleReport}
                            primary
                            text="Report"
                            className="bg-custom-yellow text-black"
                        />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ReportModal;
