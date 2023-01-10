import React from "react";
import ReactDOM from 'react-dom'
import Navbar from "./Navbar";
import Modal from "features/auth/components/Modal";
import Nav from "./Nav";
import classNames from "classnames";
import ChatLayout from "features/chat/components/ChatLayout";
import { useSelector } from "react-redux";
import { Notification } from "features/notification";

export const Layout = ({
    children,
    setLoginOverlay,
    setSignupOverlay,
    landing,
    nonavbar,
    className,
}) => {
    const user = useSelector((state) => state.auth.user);

    return (
        <main  className="min-h-screen bg-darkgray md:px-6 text-white">
            {!nonavbar && (
                <Navbar
                    landing={landing}
                    setLoginOverlay={setLoginOverlay}
                    setSignupOverlay={setSignupOverlay}
                />
            )}
            <div className={classNames(className, "lg:px-10 xl:px-24")}>{children}</div>
            <Modal></Modal>
            <Nav landing={landing} />
            {user && <ChatLayout />}
            {user && <Notification />}
        </main>
    );
};
