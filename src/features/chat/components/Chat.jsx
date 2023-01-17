import React, { useContext, useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHotkeys } from "react-hotkeys-hook";
import { Message } from "./Message";
import ChatLoader from "./ChatLoader";
import { useDispatch, useSelector } from "react-redux";
import { useGetConversationMutation, useGetMessagesMutation } from "app/api/chatApiSlice";
import { setCurrentConversation } from "../services/chatSlice";
import { wsBaseUrl } from "lib/constants";

export default function App() {
    const conversationName = useSelector((state) => state.chat.currentConversation);
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [participants, setParticipants] = useState([]);
    const [conversation, setConversation] = useState(null);
    const [messageHistory, setMessageHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(2);
    const [hasMoreMessages, setHasMoreMessages] = useState(false);
    const [meTyping, setMeTyping] = useState(false);
    const [typing, setTyping] = useState(false);

    const [getMessages] = useGetMessagesMutation();
    const [getConversation] = useGetConversationMutation();
    const dispatch = useDispatch();

    const messageContainer = useRef();

    function updateTyping(event) {
        if (event.user !== user?.username) {
            setTyping(event.typing);
        }
    }

    const { readyState, sendJsonMessage } = useWebSocket(
        user ? `${wsBaseUrl}/ws/chats/${conversationName}/` : null,
        {
            queryParams: {
                token: token ? token?.access : "",
            },
            onOpen: () => {
                console.log("Connected!");
            },
            onClose: () => {
                console.log("Disconnected!");
            },
            // onMessage handler
            onMessage: (e) => {
                const data = JSON.parse(e.data);
                switch (data.type) {
                    case "chat_message_echo":
                        setMessageHistory((prev) => [data.message, ...prev]);
                        sendJsonMessage({
                            type: "read_messages",
                        });
                        break;
                    case "last_50_messages":
                        setMessageHistory(data.messages);
                        setHasMoreMessages(data.has_more);
                        break;
                    case "user_join":
                        setParticipants((pcpts) => {
                            if (!pcpts.includes(data.user)) {
                                return [...pcpts, data.user];
                            }
                            return pcpts;
                        });
                        break;
                    case "user_leave":
                        setParticipants((pcpts) => {
                            const newPcpts = pcpts.filter((x) => x !== data.user);
                            return newPcpts;
                        });
                        break;
                    case "online_user_list":
                        setParticipants(data.users);
                        break;
                    case "typing":
                        updateTyping(data);
                        break;
                    default:
                        console.error("Unknown message type!");
                        break;
                }
            },
        }
    );

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];

    useEffect(() => {
        if (connectionStatus === "Open") {
            sendJsonMessage({
                type: "read_messages",
            });
        }
    }, [connectionStatus, sendJsonMessage]);

    async function fetchMessages() {
        try {
            const data = await getMessages({ conversationName, page }).unwrap();
            setHasMoreMessages(data.next !== null);
            setPage(page + 1);
            setMessageHistory((prev) => prev.concat(data.results));
        } catch (err) {
            console.log(err);
        }
    }

    const timeout = useRef();

    function timeoutFunction() {
        setMeTyping(false);
        sendJsonMessage({ type: "typing", typing: false });
    }

    function onType() {
        if (meTyping === false) {
            setMeTyping(true);
            sendJsonMessage({ type: "typing", typing: true });
            timeout.current = setTimeout(timeoutFunction, 5000);
        } else {
            clearTimeout(timeout.current);
            timeout.current = setTimeout(timeoutFunction, 5000);
        }
    }

    function handleChangeMessage(e) {
        setMessage(e.target.value);
        onType();
    }

    useEffect(() => () => clearTimeout(timeout.current), []);


    const handleSubmit = () => {
        if (message.length === 0) return;
        if (message.length > 512) return;
        sendJsonMessage({
            type: "chat_message",
            message,
        });
        setMessage("");
        clearTimeout(timeout.current);
        timeoutFunction();
    };

    const inputReference = useHotkeys(
        "enter",
        () => {
            handleSubmit();
        },
        {
            enableOnTags: ["INPUT"],
        }
    );

    useEffect(() => {
        inputReference.current.focus();
    }, [inputReference]);

    useEffect(() => {
        async function fetchConversation() {
            try {
                const data = await getConversation({ conversationName }).unwrap();
                console.log(data);
                setConversation(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchConversation();
    }, [conversationName, user]);

    return (
        <>
            <div className="h-full flex flex-col justify-between gap-2 ">
                {conversation && (
                    <div className="flex gap-2 items-center">
                        <span
                            onClick={() => dispatch(setCurrentConversation(null))}
                            className=" text-white rounded-full cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.5em"
                                height="1.5em"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M9.125 21.1L.7 12.7q-.15-.15-.212-.325Q.425 12.2.425 12t.063-.375Q.55 11.45.7 11.3l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L3.55 12l7.35 7.35q.35.35.35.862q0 .513-.375.888t-.875.375q-.5 0-.875-.375Z"
                                />
                            </svg>
                        </span>
                        <img
                            className="-ml-2 w-10 aspect-square h-10 object-cover rounded-full"
                            src={conversation.other_user.profile.profile_pic}
                            alt=""
                        />
                        <div className="flex flex-col gap-0">
                            <h4 className=" font-semibold">
                                {conversation.other_user.profile.full_name}
                            </h4>

                            {typing ? (
                                <p className="truncate text-sm text-gray-500">typing...</p>
                            ) : (
                                <span className="text-sm -mt-1 text-gray-500">
                                    {participants.includes(conversation.other_user.username)
                                        ? " online"
                                        : " offline"}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                <div
                    id="scrollableDiv"
                    ref={messageContainer}
                    className="overflow-auto h-full flex flex-col-reverse p-2">
                    <InfiniteScroll
                        dataLength={messageHistory.length}
                        next={fetchMessages}
                        className="flex flex-col-reverse overflow-clip" // To put endMessage and loader to the top
                        inverse={true}
                        hasMore={hasMoreMessages}
                        loader={<ChatLoader />}
                        scrollableTarget="scrollableDiv">
                        {messageHistory.map((message) => (
                            <Message key={message.id} message={message} />
                        ))}
                    </InfiniteScroll>
                </div>

                <div className="flex w-full items-center justify-between">
                    <input
                        type="text"
                        placeholder="Message"
                        className="block w-full rounded-full bg-gray-100 py-2 px-4 outline-none focus:text-gray-700"
                        name="message"
                        value={message}
                        onChange={handleChangeMessage}
                        onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
                        required
                        ref={inputReference}
                        maxLength={511}
                    />
                    <span className="cursor-pointer" onClick={handleSubmit}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2.9em"
                            height="2.9em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2M8 7.71v3.34l7.14.95l-7.14.95v3.34L18 12L8 7.71Z"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </>
    );
}
