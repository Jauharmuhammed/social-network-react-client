import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Admin, UserManagement, Error404, Profile, CreatePostPage, PostPage, Feed } from "pages/index";
import PrivateRoute from "utils/PrivateRoute";
import { Toaster } from "react-hot-toast";
import VerifyMail from "features/auth/components/VerifyMail";
import VerifyPasswordChange from "features/auth/components/VerifyPasswordChange";
import AdminRoute from "utils/AdminRoute";
import { useDispatch, useSelector } from "react-redux";
import axios from './lib/axios'
import { logOut, setCredentials } from "features/auth/services/authSlice";

function App() {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)


    const updateToken = () => {
        if (!token) return
        console.log('update token triggered');

        axios
            .post("/token/refresh/", { refresh: token?.refresh })
            .then((response) => {
                dispatch(setCredentials(response.data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(logOut())
            });

        if (loading) {
            setLoading(false)
        }
    };


    useEffect(() => {
        if (loading) {
            updateToken()
        }

        const fourMinutes = 1000 * 60 * 4;
        let interval = setInterval(() => {
            if (token) {
                updateToken()
            }
        }, fourMinutes);
        return () => clearInterval(interval);
    }, [token, loading]);


    return (
        <>
            <Toaster />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/" element={<PrivateRoute />}>


                    <Route path="auth" >
                        <Route path="email/verify/:uid/:token" element={<VerifyMail />} />
                        <Route path="forgot/password/:uid/:token" element={<VerifyPasswordChange />} />
                    </Route>


                    <Route path="admin" element={<AdminRoute />}>
                        <Route index element={<Admin />} />
                        <Route path="user-management" element={<UserManagement />} />
                    </Route>

                    <Route path="create" element={<CreatePostPage />} />

                    <Route path="post/:id" element={<PostPage />} />

                    <Route path="tag/:tag" element={<Feed />} />
                    
                    <Route path=":username" element={<Profile />} />

                </Route>
                <Route path="notfound" element={<Error404 />} />
                {/* Catch all - replace with 404 component */}
                <Route path="*" element={<Error404 />} replace />
            </Routes>
        </>
    );
}

export default App;
