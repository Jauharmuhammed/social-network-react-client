import axios from "../utils/axios";
import jwtDecode from "jwt-decode";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "redux/userSlice";
import { closeLogin, closeSignup } from "redux/authModalSlice";
import toast from "react-hot-toast";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleAuth = async (response) => {
    console.log(response.credential);
    console.log(jwtDecode(response.credential));
    await axios
      .post("/auth/google/", { token: response.credential })
      .then((response) => {
        console.log(response);
        dispatch(updateUser(response.data));
        dispatch(closeLogin());
        dispatch(closeSignup());
        toast.success("Logged in successfully.", {
          style: {
            borderRadius: "100px",
          },
        });
      });
  };
  useEffect(() => {
    //   global google
    const google = window.google

    google.accounts.id.initialize({
      client_id:
        "988264526174-66jbkht9o0b40d84a35jvvksvuu93oq7.apps.googleusercontent.com",
      callback: handleGoogleAuth,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleAuthButton"),
      {
        theme: "outline",
        size: "large",
        width: "354",
        shape: "pill",
        logo_alignment: "center",
        text: "continue_with",
      }
    );

    google.accounts.id.prompt();

  }, []);

  return (
    <div
      id="googleAuthButton"
      className="w-full rounded-3xl absolute top-0 left-0"
    ></div>
  );
};

export default GoogleAuth;
