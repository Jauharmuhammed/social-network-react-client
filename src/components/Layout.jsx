import React from "react";
import Navbar from "./Navbar";
import Modal from "features/auth/components/Modal";
import Nav from "./Nav";
import classNames from "classnames";
import ChatLayout from "features/chat/components/ChatLayout";

export const Layout = ({
    children,
    setLoginOverlay,
    setSignupOverlay,
    landing,
    nonavbar,
    className,
}) => {
    return (
        <main className="min-h-screen bg-darkgray md:px-6 text-white">
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
            <ChatLayout />
        </main>
    );
};
