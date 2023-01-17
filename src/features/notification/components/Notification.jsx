import Aside from "components/Aside";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNotificationModal } from "../services/notificationModalSlice";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { increaseUnreadNotificationCount, setUnreadNotificationCount, updateNotifications,  } from "../services/notifiicationSlice";
import NotificationList from "./NotificationList";
import { wsBaseUrl } from "lib/constants";

const Notification = () => {
    const notificationModal = useSelector((state) => state.notificationModal.notificationModal);
    const dispatch = useDispatch();
    const notificationRef = useRef();

    const token = useSelector((state) => state.auth.token);

    const { readyState, sendJsonMessage } = useWebSocket(token ? `${wsBaseUrl}/ws/notifications/` : null, {
        queryParams: {
            token: token ? token?.access : "",
        },
        onOpen: () => {
            console.log("Connected to All Notifications!");
        },
        onClose: () => {
            console.log("Disconnected from All Notifications!");
        },
        onMessage: (e) => {
            const data = JSON.parse(e.data);
            switch (data.type) {
                case "unread_count":
                    console.log(data);
                    dispatch(setUnreadNotificationCount(data.unread_count))
                    break;
                case "new_notification":
                    console.log(data)
                    dispatch(updateNotifications(data.message))
                    dispatch(increaseUnreadNotificationCount())
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

    

    const handleClickOutside = (e) => {
        if (!notificationRef.current.contains(e.target)) {
            dispatch(closeNotificationModal());
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    });

    useEffect(() => {
        if (connectionStatus === "Open") {
            sendJsonMessage({
                type: "read_notifications",
            });
        }
    }, [connectionStatus, sendJsonMessage]);

    return (
        <Aside
            reference={notificationRef}
            active={notificationModal}
            closeActive={() => dispatch(closeNotificationModal())}>
            <h3 className="text-center my-1">Notifications</h3>
            {notificationModal &&<NotificationList connectionStatus={connectionStatus} sendJsonMessage={sendJsonMessage}/>}
        </Aside>
    );
};

export default Notification;
