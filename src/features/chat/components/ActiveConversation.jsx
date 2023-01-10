import { useGetActiveConversationsMutation } from "app/api/chatApiSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentConversation } from "../services/chatSlice";

const ActiveConversations = () => {
    const user = useSelector((state) => state.auth.user);
    const [conversations, setActiveConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);
    const [getActiveConversations] = useGetActiveConversationsMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getActiveConversations().unwrap();
                console.log(data);
                setActiveConversations(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUsers();
    }, [user]);

    function createConversationName(username) {
        const namesAlph = [user?.username, username].sort();
        return `${namesAlph[0]}__${namesAlph[1]}`;
    }

    function formatMessageTimestamp(timestamp) {
        if (!timestamp) return;
        const date = new Date(timestamp);
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    }

    useEffect(() => {
        console.log("conversations", conversations);
        const arr = [...conversations];
        setSortedConversations(
            arr?.sort((a, b) =>
                a.last_message.timestamp < b.last_message.timestamp
                    ? 1
                    : b.last_message.timestamp < a.last_message.timestamp
                    ? -1
                    : 0
            )
        );
    }, [conversations]);

    return (
        <div>
            {sortedConversations.map((c) => (
                <div
                    key={c.id}
                    onClick={() =>
                        dispatch(
                            setCurrentConversation(createConversationName(c.other_user.username))
                        )
                    }
                    className=" w-full flex gap-3 py-2 cursor-pointer hover:bg-stone-900">
                    <img
                        className="w-12 h-12 aspect-square rounded-full object-cover"
                        src={c.other_user.profile.profile_pic}
                        alt={c.other_user.profile.full_name}
                    />
                    <div className="w-full">
                        <div className="flex justify-between">
                            <h3 className="text-l font-semibold text-gray-300">
                                {c.other_user.profile.full_name}
                            </h3>
                            {c.unread_count > 0 && (
                                <p className="text-black text-sm rounded-full bg-custom-yellow relative w-4 h-4">
                                    <span className="absolute text-xs left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                        {c.unread_count}
                                    </span>
                                </p>
                            )}
                        </div>
                        <div className=" flex justify-between text-sm">
                            <p className="text-gray-500">{c.last_message?.content}</p>
                            <p className="text-gray-500">
                                {formatMessageTimestamp(c.last_message?.timestamp)}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ActiveConversations;
