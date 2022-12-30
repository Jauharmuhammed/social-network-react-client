import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeLogin, closeSignup } from "features/auth/services/authModalSlice";
import { useGoogleAuthMutation } from "app/api/authApiSlice";
import { setCredentials } from "features/auth/services/authSlice";
import jwtDecode from "jwt-decode";
import BackdropSpinner from "../../../components/BackdropSpinner";
import successToast from "utils/toasts/successToast";

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const [googleAuth, { isLoading }] = useGoogleAuthMutation();

    // callback function google authentication
    const handleGoogleAuth = async (response) => {
        console.log(jwtDecode(response.credential));
        try {
            const userCredentials = await googleAuth({
                token: response.credential,
            }).unwrap();

            // set user and token
            dispatch(setCredentials(userCredentials));

            // close login and signup modals if they are open
            dispatch(closeLogin());
            dispatch(closeSignup());

            // success toads
            successToast("Logged in successfully.");
        } catch (err) {
            console.log(err);
        }
    };

    // initialize the google auhtentication and render the button in html
    useEffect(() => {
        /* global google */
        google?.accounts?.id?.initialize({
            client_id: "988264526174-66jbkht9o0b40d84a35jvvksvuu93oq7.apps.googleusercontent.com",
            callback: handleGoogleAuth,
        });

        google?.accounts?.id?.renderButton(document.getElementById("googleAuthButton"), {
            theme: "outline",
            size: "large",
            width: window.innerWidth > 500 ? "354" : '294',
            shape: "pill",
            logo_alignment: "center",
            text: "continue_with",
        });

        // google auth popup on the right side when the page loads
        google.accounts.id.prompt();
    }, []);

    return (
        <>
            {isLoading && <BackdropSpinner />}
            <div id="googleAuthButton" className="w-full rounded-3xl absolute top-0 left-0"></div>
        </>
    );
};

export default GoogleAuth;
