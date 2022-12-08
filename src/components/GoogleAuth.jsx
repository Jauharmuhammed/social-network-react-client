import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeLogin, closeSignup } from "features/auth/authModalSlice";
import toast from "react-hot-toast";
import { useGoogleAuthMutation } from "app/api/authApiSlice";
import { setCredentials } from "features/auth/authSlice";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const [googleAuth, {isLoading}] = useGoogleAuthMutation()

  const handleGoogleAuth = async (response) => {
    // console.log(response.credential);
    // console.log(jwtDecode(response.credential));
    try{
      const userCredentials = await googleAuth({token: response.credential}).unwrap()
      console.log(userCredentials);
      dispatch(setCredentials(userCredentials));
      dispatch(closeLogin());
      dispatch(closeSignup());
      toast.success("Logged in successfully.", {
        style: {
          borderRadius: "100px",
        },
      });
    }
    catch (err){
      console.log(err);
    }
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
