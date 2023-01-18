import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
    Home,
    Admin,
    UserManagement,
    Error404,
    Profile,
    CreatePostPage,
    PostPage,
    Feed,
    Collection,
    Settings,
} from "pages/index";
import PrivateRoute from "utils/PrivateRoute";
import { Toaster } from "react-hot-toast";
import VerifyMail from "features/auth/components/VerifyMail";
import VerifyPasswordChange from "features/auth/components/VerifyPasswordChange";
import AdminRoute from "utils/AdminRoute";
import { useDispatch, useSelector } from "react-redux";
import axios from "./lib/axios";
import { logOut, setCredentials } from "features/auth/services/authSlice";
import { useCollectionsByUserQuery } from "app/api/usersApiSlice";
import CollectionModal from "features/collection/components/CollectionModal";
import {
    setCurrentCollection,
    setCurrentUserCollections,
} from "features/collection/services/collectionSlice";
import { CreateCollectionModal } from "features/collection";
import { updateUnreadMessageCount } from "features/chat/services/chatNotificationSlice";
import useChatNotification from "features/chat/hooks/useChatNotification";
import { Layout } from "components/Layout";

function App() {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const { unreadMessageCount } = useChatNotification();

    const currentCollection = useSelector((state) => state.collection.currentCollection);
    const { data: collections } = useCollectionsByUserQuery({ username: user?.username });
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const updateToken = () => {
        if (!token) return;
        console.log("update token triggered");

        axios
            .post("/token/refresh/", { refresh: token?.refresh })
            .then((response) => {
                dispatch(setCredentials(response.data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(logOut());
            });

        if (loading) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const fourMinutes = 1000 * 60 * 4;
        let interval = setInterval(() => {
            if (token) {
                updateToken();
            }
        }, fourMinutes);
        return () => clearInterval(interval);
    }, [token, loading]);

    useEffect(() => {
        dispatch(setCurrentUserCollections(collections));
        if (collections?.length > 0) {
            if (!currentCollection) {
                dispatch(setCurrentCollection(collections[0]));
            }
        }
    }, [collections, user]);

    useEffect(() => {
        dispatch(updateUnreadMessageCount(unreadMessageCount));
    }, [user, unreadMessageCount]);

    return (
        <>
            <Toaster />
            <CollectionModal />
            <CreateCollectionModal />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="admin" element={<AdminRoute />}>
                    <Route index element={<Admin />} />
                    <Route path="user-management" element={<UserManagement />} />
                </Route>

                <Route path="/auth">
                    <Route path="email/verify/:uid/:token" element={<VerifyMail />} />
                    <Route path="forgot/password/:uid/:token" element={<VerifyPasswordChange />} />
                </Route>

                <Route path="/" element={<PrivateRoute />}>
                    <Route element={<Layout />}>
                        <Route path="create" element={<CreatePostPage />} />
                        <Route path="post/:id" element={<PostPage />} />
                        <Route path="tag/:tag" element={<Feed />} />

                        <Route path="settings" element={<Settings />} />
                        <Route path=":username">
                            <Route index element={<Profile />} />
                            <Route path=":collection" element={<Collection />} />
                        </Route>
                    </Route>
                </Route>

                {/* Catch all - replace with 404 component */}
                <Route path="*" element={<Error404 />} replace />
            </Routes>
        </>
    );
}

export default App;
