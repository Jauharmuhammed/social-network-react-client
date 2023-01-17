import { wsBaseUrl } from "lib/constants";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";

const useNotification = () => {
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);
    const token = useSelector(state => state.auth.token)
    
    const { readyState } = useWebSocket(token ? `${wsBaseUrl}/ws/notifications/` : null, {
        queryParams: {
            token: token ? token?.access : "",
        },
        onOpen: () => {
            console.log("Connected to Notifications!");
        },
        onClose: () => {
            console.log("Disconnected from Notifications!");
        },
        onMessage: (e) => {
            const data = JSON.parse(e.data);
            switch (data.type) {
                case "unread_count":
                    setUnreadMessageCount(data.unread_count);
                    break;
                case "new_message_notification":
                    setUnreadMessageCount((count) => (count += 1));
                    break;
                default:
                    console.error("Unknown message type!");
                    break;
            }
        },
    });
    
    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];

    return {unreadMessageCount, connectionStatus}
}

export default useNotification
