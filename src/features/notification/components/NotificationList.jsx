import { useGetNotificationsMutation } from "app/api/notificationApiSlice";
import TimeAgo from "components/TimeAgo";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setNotifications } from "../services/notifiicationSlice";

const NotificationList = ({ connectionStatus, sendJsonMessage }) => {
    const user = useSelector((state) => state.auth.user);
    const notification_list = useSelector((state) => state.notification.notifications);
    const [getNotifications, { isLoading }] = useGetNotificationsMutation();
    const dispatch = useDispatch();

    async function fetchNotifications() {
        try {
            const res = await getNotifications().unwrap();
            console.log(res);
            dispatch(setNotifications(res));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, [user]);

    useEffect(() => {
        if (connectionStatus === "Open") {
            sendJsonMessage({
                type: "read_notifications",
            });
        }
    }, [connectionStatus, sendJsonMessage]);

    return (
        <div className="flex flex-col">
            {notification_list?.map((notification) => (
                <div key={notification.id} className="flex gap-5 p-2">
                    <Link to={`/${notification.created_by_profile.username}`}>
                        <img
                            className="w-10 h-10 aspect-square object-cover rounded-full"
                            src={notification.created_by_profile.profile_pic}
                            alt=""
                        />
                    </Link>
                    <div className="flex flex-col">
                        <p className="text-sm">
                            <Link to={`/${notification.created_by_profile.username}`}>
                                {notification.created_by_profile.full_name}
                            </Link>
                            <span className="text-gray-400"> {notification.content}</span>
                        </p>
                        <TimeAgo
                            className="text-xs text-gray-600"
                            timestamp={notification.created}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
