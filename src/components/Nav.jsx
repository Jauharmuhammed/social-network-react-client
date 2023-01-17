import { openChatModal } from "features/chat/services/chatModalSlice";
import { openNotificationModal } from "features/notification/services/notificationModalSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ landing }) => {
    const user = useSelector((state) => state.auth.user);
    const unreadNotificationCount = useSelector((state) => state.notification.unreadCount);
    const unreadMessageCount = useSelector((state) => state.chatNotification.unreadMessageCount);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const icons = [
        {
            target: "/",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24">
                    <g fill="none">
                        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                        <path
                            fill="currentColor"
                            d="M13.2 2.65a2 2 0 0 0-2.4 0l-7 5.25A2 2 0 0 0 3 9.5V19a2 2 0 0 0 2 2h3.9a1.1 1.1 0 0 0 1.1-1.1V15a2 2 0 1 1 4 0v4.9a1.1 1.1 0 0 0 1.1 1.1H19a2 2 0 0 0 2-2V9.5a2 2 0 0 0-.8-1.6l-7-5.25Z"
                        />
                    </g>
                </svg>
            ),
        },
        {
            onClick: () => dispatch(openChatModal()),
            icon: (
                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.3em"
                        height="1.3em"
                        viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.515 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8z"
                        />
                    </svg>
                    {unreadMessageCount > 0 && (
                        <span className="absolute text-xs text-black -top-1.5 -right-1.5  bg-custom-yellow rounded-full w-4 h-4 flex justify-center items-center">
                            <span>{unreadMessageCount}</span>
                        </span>
                    )}
                </div>
            ),
        },
        {
            target: "/create",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-3h3.025q.425 0 .7-.288Q17 12.425 17 12t-.288-.713Q16.425 11 16 11h-3V7.975q0-.425-.287-.7Q12.425 7 12 7t-.712.287Q11 7.575 11 8v3H7.975q-.425 0-.7.287Q7 11.575 7 12t.287.712Q7.575 13 8 13h3v3.025q0 .425.288.7q.287.275.712.275Zm0 5q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                    />
                </svg>
            ),
        },
        {
            onClick: () => dispatch(openNotificationModal()),
            id: "notificationButton",
            icon: (
                <div className="relative">
                    <svg
                        id="notificationButtonSvg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2em"
                        height="1.2em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 16 16">
                        <path
                            fill="currentColor"
                            d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7c0-2.42-1.72-4.44-4.005-4.901z"
                        />
                    </svg>
                    {unreadNotificationCount > 0 && (
                        <span className="absolute text-xs text-black -top-1.5 -right-1.5  bg-custom-yellow rounded-full w-4 h-4 flex justify-center items-center">
                            <span>{unreadNotificationCount}</span>
                        </span>
                    )}
                </div>
            ),
        },
        {
            target: `/${user?.username}`,
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M12 4a4 4 0 1 1 0 8a4 4 0 0 1 0-8zm0 16s8 0 8-2c0-2.4-3.9-5-8-5s-8 2.6-8 5c0 2 8 2 8 2z"
                    />
                </svg>
            ),
        },
    ];
    const items = icons.map((icon, index) => (
        <Link
            to={icon?.target}
            id={icon?.id}
            onClick={icon.onClick}
            key={index}
            className="p-4 hover:bg-black hover:bg-opacity-40 rounded-xl cursor-pointer transition-all duration-150">
            {icon.icon}
        </Link>
    ));

    return (
        !landing && (
            <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 py-3 px-8 bg-black bg-opacity-70 text-white backdrop-blur-md rounded-2xl z-[999] ">
                <ul className="list-none flex gap-2">{items}</ul>
            </nav>
        )
    );
};

export default Nav;
