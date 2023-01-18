import { useGetNotificationsMutation } from "app/api/notificationApiSlice";
import Spinner from "components/Spinner";
import TimeAgo from "components/TimeAgo";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeNotificationModal } from "../services/notificationModalSlice";
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

    if (isLoading) return <Spinner/>

    return (
        <div className="flex flex-col mt-4 overflow-auto h-[93%] pr-2 customScrollbar">
            {notification_list.length > 0 ? notification_list?.map((notification) => (
                <div key={notification.id} className="flex justify-between px-1.5 py-2 sm:hover:bg-stone-800 rounded-lg">
                    <div className="flex max-w-[82%]">
                        <Link to={`/${notification.created_by_profile.username}`} onClick={() => dispatch(closeNotificationModal())}>
                            <img
                                className="w-10 aspect-square object-cover rounded-full"
                                src={notification.created_by_profile.profile_pic}
                                alt=""
                            />
                        </Link>
                        <div className="flex flex-col px-3 max-w-[85%]">
                            <p className="text-sm ">
                                <Link to={`/${notification.created_by_profile.username}`} onClick={() => dispatch(closeNotificationModal())}>
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
                    {notification.notification_type !== "follow"  && (
                        <Link className="" to={`/post/${notification.post_details.id}`} onClick={() => dispatch(closeNotificationModal())}>
                            <img
                                className="w-12 aspect-square object-cover rounded"
                                src={notification.post_details.image}
                                alt=""
                            />
                        </Link>
                    )}
                </div>
            )) : <h3 className="text-lg text-center my-auto">No notifications</h3>}
        </div>
    );
};

export default NotificationList;
