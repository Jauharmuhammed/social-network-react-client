import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export function Message({ message }) {
    const user = useSelector((state) => state.auth.user);
    const [messageContent, setMessageContent] = useState("");
    const [clipped, setClipped] = useState(false);
    const [hidden, setHidden] = useState(true);

    function formatMessageTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US',{ hour: 'numeric', minute: 'numeric', hour12: true })
    }

    useEffect(() => {
        if (message.content.length > 80) {
            setMessageContent(message.content.substring(0, 80));
            setClipped(true);
        } else {
            setMessageContent(message.content);
        }
    }, [message]);
    return (
        <li
            className={classNames(
                "mt-1 mb-1 flex ",
                user.username === message.to_user.username ? "justify-start" : "justify-end"
            )}>
            <div
                className={classNames(
                    "relative rounded-lg px-2 py-1 max-w-[90%] shadow ",
                    user.username === message.to_user.username
                        ? "bg-gray-100 text-gray-700"
                        : "text-white border"
                )}>
                <div className="flex items-end">
                    <span>
                        {messageContent}
                        {clipped && (
                            <span
                                onClick={() => {
                                    setMessageContent((prev) =>
                                        prev === message.content
                                            ? message.content.substring(0, 80)
                                            : message.content
                                    );
                                    setHidden((prev) => !prev);
                                }}
                                className="text-gray-500 text-sm font-normal ml-auto cursor-pointer">
                                &nbsp;...{hidden ? "See more" : "See less"}
                            </span>
                        )}
                    </span>
                    <span
                        className="ml-2"
                        style={{
                            fontSize: "0.6rem",
                            lineHeight: "1rem",
                        }}>
                        {formatMessageTimestamp(message.timestamp)}
                    </span>
                </div>
            </div>
        </li>
    );
}
