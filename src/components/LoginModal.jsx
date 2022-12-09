import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { BiErrorCircle } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { closeLogin, openSignup } from "features/auth/authModalSlice";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import GoogleAuth from "./GoogleAuth";
import { useLoginMutation } from "app/api/authApiSlice";
import { setCredentials } from "features/auth/authSlice";
import ButtonSpinner from "./ButtonSpinner";

const LoginModal = () => {
  const loginOverlay = useSelector((state) => state.authModal.loginModal);
  const signupOverlay = useSelector((state) => state.authModal.signupModal);

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    if (!result && email) {
      setEmailErr("Please enter a valid email address.");
    } else {
      setEmailErr("");
    }
  }, [email]);

  useEffect(() => {
    setErrMsg("");
    setEmailErr("");
    setPasswordErr("");
  }, [email, password]);

  const loginUser = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    const emailValidation = EMAIL_REGEX.test(email);
    if (!emailValidation || !password) {
      if (!emailValidation) {
        setEmailErr("This field is required");
      }

      if (!password) {
        setPasswordErr("This field is required");
      }
      return;
    }

    try {
      const response = await login({ email, password }).unwrap();
      console.log(response);
      dispatch(setCredentials(response));
      dispatch(closeLogin());
      toast.success("Logged in successfully.", {
        style: {
          borderRadius: "100px",
        },
      });
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
      if (!err?.data) {
        setErrMsg("No Server Response");
      } else if (err.status === 401) {
        setErrMsg("No active account found with the given credentials");
      } else {
        setErrMsg("Email or password is incorrect.");
      }
    }
  };

  const handlClose = (e) => {
    if (e.target.id === "loginModalContainer") dispatch(closeLogin());
  };

  const Eye = ({ handleVisibility }) => {
    const style =
      "absolute right-5 top-[17px] translate-y-[10%] cursor-pointer";
    if (!passwordVisibility) {
      return <BsEyeSlash className={style} onClick={handleVisibility} />;
    }
    return <BsEye className={style} onClick={handleVisibility} />;
  };

  Eye.propTypes = {
    handleVisibility: PropTypes.func,
  };

  return (
    <>
      <div
        id="loginModalContainer"
        onClick={handlClose}
        // className=" fixed  inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center"
        className={
          (loginOverlay ? "flex" : "hidden") +
          " fixed  inset-0 bg-black bg-opacity-40 backdrop-blur-sm  justify-center items-center"
        }
      >
        {/* overlay */}
        <div
          className={
            (loginOverlay ? "opacity-100" : "translate-y-96 opacity-0") +
            " transform w-[450px] h-fit relative rounded-[2rem] bg-black back text-white p-12 transition-transform duration-1000  mt-16"
          }
        >
          <div className="flex flex-col items-center">
            <h1 className="font-boogaloo text-yellow text-5xl pb-2 mt-4">
              showyourwork
            </h1>
            <h3 className="font-semibold text-xl mt-3">Login</h3>
            <form onSubmit={loginUser} className="w-full text-center">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                className={`w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300 mt-5 mb-5 ${
                  emailErr ? "border-red-700" : "border-white "
                }`}
              />
              {emailErr && (
                <p className="text-red-700 -mt-4 mb-1 flex ml-2 items-center text-sm">
                  <BiErrorCircle />
                  &nbsp;{emailErr}
                </p>
              )}
              <div className="w-full h-fit relative">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300 mb-5 ${
                    passwordErr ? "border-red-700" : ""
                  }`}
                />
                {passwordErr && (
                  <p className="text-red-700 -mt-4   my-1 flex ml-2 items-center text-sm">
                    <BiErrorCircle />
                    &nbsp;{passwordErr}
                  </p>
                )}
                {errMsg && (
                  <p className="text-red-700 my-1 flex justify-center items-start text-sm">
                    <span>{errMsg}</span>
                  </p>
                )}
                <Eye
                  handleVisibility={() =>
                    setPasswordVisibility(!passwordVisibility)
                  }
                />
              </div>
              <p className="font-medium text-sm ">Forgot Password?</p>
              <button
                disabled={isLoading}
                className="w-full rounded-3xl mt-5 py-3 px-4 bg-yellow text-black font-semibold outline-none"
              >
                {isLoading ? <ButtonSpinner /> : "Login"}
              </button>
            </form>
            <p className="py-3 font-semibold">OR</p>
            <button className="w-full rounded-3xl min-h-[44px] relative  bg-transparent outline-none flex items-center justify-center ">
              {!signupOverlay && <GoogleAuth />}
            </button>

            <p className="text-xs text-center mx-6 my-4">
              By continuing, you agree to Showyourworks&apos; <br />
              <strong>Terms of Service</strong> and acknowledge that you&apos;ve
              read our <strong>Privacy Policy</strong>
            </p>
            <p className="text-sm text-center ">
              Not on Showyourwork yet?
              <strong
                onClick={() => dispatch(openSignup())}
                className="cursor-pointer"
              >
                Sign up
              </strong>
            </p>
          </div>
          <IoCloseSharp
            className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
            onClick={() => dispatch(closeLogin())}
          />
        </div>
      </div>
    </>
  );
};

export default LoginModal;
