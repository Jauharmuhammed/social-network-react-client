import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import Modal from "features/auth/components/Modal";
import Nav from "./Nav";
import classNames from "classnames";
import ChatLayout from "features/chat/components/ChatLayout";
import { useSelector } from "react-redux";
import { Notification } from "features/notification";
import { Outlet } from "react-router-dom";

export const Layout = ({
    children,
    setLoginOverlay,
    setSignupOverlay,
    landing,
    nonavbar,
    className,
}) => {
    const user = useSelector((state) => state.auth.user);
    const chatModal = useSelector((state) => state.chatModal.chatModal);
    const conversationName = useSelector((state) => state.chat.currentConversation);

    return (
        <main className="min-h-screen bg-darkgray md:px-6 text-white">
            {!nonavbar && (
                <Navbar
                    landing={landing}
                    setLoginOverlay={setLoginOverlay}
                    setSignupOverlay={setSignupOverlay}
                />
            )}
            <div className={classNames(className, "lg:px-10 xl:px-24 pb-24 ")}>
                {children}
                <Outlet/>
            </div>

            <Modal></Modal>
            {!(chatModal && conversationName) &&<Nav landing={landing} />}
            {user && <ChatLayout />}
            {user && <Notification />}
        </main>
    );
};
