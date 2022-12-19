import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Admin, UserManagement, Error404, Profile, CreatePostPage } from "pages/index";
import PrivateRoute from "utils/PrivateRoute";
import { Toaster } from "react-hot-toast";
import VerifyMail from "features/auth/components/VerifyMail";
import VerifyPasswordChange from "features/auth/components/VerifyPasswordChange";
import AdminRoute from "utils/AdminRoute";

function App() {
    return (
        <>
            <Toaster />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/" element={<PrivateRoute />}>

                    <Route path=":username" element={<Profile />} />

                    <Route path="auth" >
                        <Route path="email/verify/:uid/:token" element={<VerifyMail />} />
                        <Route path="forgot/password/:uid/:token" element={<VerifyPasswordChange />} />
                    </Route>


                    <Route path="admin" element={<AdminRoute />}>
                        <Route index element={<Admin />} />
                        <Route path="user-management" element={<UserManagement />} />
                    </Route>

                    <Route path="create" element={<CreatePostPage/>} />


                </Route>
                    <Route path="notfound" element={<Error404 /> } />
                    {/* Catch all - replace with 404 component */}
                    <Route path="*" element={<Error404 /> } replace />
            </Routes>
        </>
    );
}

export default App;
