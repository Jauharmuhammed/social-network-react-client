import React, { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeLogin, closeSignup, openLogin } from "redux/authModalSlice";
import axios from "../utils/axios";
import { BiErrorCircle } from "react-icons/bi";
import { updateUser } from "redux/userSlice";
import { toast } from "react-hot-toast";
import GoogleAuth from "./GoogleAuth";

const SignupModal = () => {
  const signupOverlay = useSelector((state) => state.authModal.signupModal);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const dispatch = useDispatch();

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const MOBILE_REGEX = /^[0-9]{10}$/;
  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,24}$/;

  const REGISTER_URL = "/register/";
  const TOKEN_URL = "/token/";

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const [mobile, setMobile] = useState("");
  const [mobileErr, setMobileErr] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    if (!result && email) {
      setEmailErr("Please enter a valid email address.");
    } else {
      setEmailErr("");
    }
  }, [email]);

  useEffect(() => {
    const result = MOBILE_REGEX.test(mobile);
    if (!result && mobile) {
      setMobileErr("Please enter a 10 digit mobile number.");
    } else {
      setMobileErr("");
    }
  }, [mobile]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    if (!result && password) {
      setPasswordErr(`
      8 to 24 characters
      Must include uppercase and lowercase letters, a number and a special character
      Allowed special characters: ! @ # $ % 
      `);
    } else {
      setPasswordErr("");
    }
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [email, mobile, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = MOBILE_REGEX.test(mobile);
    const v3 = PWD_REGEX.test(password);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      console.log("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, {
        email,
        mobile_number: mobile,
        password,
      });
      console.log(response?.data);
      console.log(response);
      setSuccessMsg(true);

      //authenicate the newly created user
      try {
        const res = await axios.post(TOKEN_URL, { email, password });
        console.log(res);
        dispatch(updateUser(res.data));
        dispatch(closeLogin());
        dispatch(closeSignup());

        toast.success("Account created successfully", {
          style: {
            borderRadius: "10px",
          },
        });
      } catch (err) {
        console.log(err);
        // if an error occured during authentication open login modal
        dispatch(openLogin());
      }

      //clear state
      setEmail("");
      setMobile("");
      setPassword("");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.data?.email) {
        setEmailErr("An account already exists with this email");
      } else if (err.response?.data?.mobile_number) {
        setMobileErr("This mobile number is already registered.");
      } else {
        setErrMsg("Registration failed, Please try again.");
      }
    }
  };

  const handlClose = (e) => {
    if (e.target.id === "signupModalContainer") dispatch(closeSignup());
  };

  const Eye = ({ handleVisibility }) => {
    const style =
      "absolute right-5 top-[17px] translate-y-[10%] cursor-pointer";
    if (!passwordVisibility) {
      return <BsEyeSlash className={style} onClick={handleVisibility} />;
    }
    return <BsEye className={style} onClick={handleVisibility} />;
  };
  return (
    <div
      id="signupModalContainer"
      onClick={handlClose}
      className={
        (signupOverlay ? "flex" : "hidden") +
        " fixed  inset-0 bg-black bg-opacity-40 backdrop-blur-sm  justify-center items-center"
      }
    >
      {/* overlay */}
      <div
        className={
          (signupOverlay ? "opacity-100" : "translate-y-96 opacity-0") +
          " transform w-[450px] h-fit relative rounded-[2rem] bg-black back text-white p-12 transition-transform duration-1000  mt-16"
        }
      >
        <div className="flex flex-col items-center">
          <h1 className="font-boogaloo text-yellow text-5xl pb-2 mt-4">
            showyourwork
          </h1>
          <h3 className="font-semibold text-xl mt-3">Signup</h3>
          <form className="w-full" onSubmit={handleSubmit} autoComplete="none">
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="none"
              autoFocus
              className={`w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300 mt-5 mb-5 ${
                emailErr ? "border-red-700" : " "
              }`}
            />
            {emailErr && (
              <p className="text-red-700 -mt-4 mb-1 flex ml-2 items-center text-sm">
                <BiErrorCircle />
                &nbsp;{emailErr}
              </p>
            )}

            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number"
              autoComplete="on"
              // pattern="\d{10}"
              // title="Please enter exactly 10 digits"
              className={`w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300  ${
                mobileErr ? "border-red-700" : "mb-5 "
              }`}
            />
            {mobileErr && (
              <p className="text-red-700  my-1 flex ml-2 items-center text-sm">
                <BiErrorCircle />
                &nbsp;{mobileErr}
              </p>
            )}
            <div className="w-full h-fit relative">
              <input
                type={passwordVisibility ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300  ${
                  passwordErr ? "border-red-700" : "mb-5"
                }`}
              />
              {passwordErr && (
                <p className="text-red-700 my-1 flex items-start ml-2 text-sm">
                  <span className="text-base mt-0.5 mr-1">
                    <BiErrorCircle />
                  </span>
                  <span>
                    must be 8 to 24 characters.
                    <br />
                    must include uppercase and lowercase letters, a number and a
                    special character.
                  </span>
                </p>
              )}
              {errMsg && (
                <p className="text-red-700 my-1 flex items-start ml-2 text-sm">
                  <span className="text-base mt-0.5 mr-1">
                    <BiErrorCircle />
                  </span>
                  <span>{errMsg}</span>
                </p>
              )}
              <Eye
                handleVisibility={() =>
                  setPasswordVisibility(!passwordVisibility)
                }
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-3xl  py-3 px-4 bg-yellow text-black font-semibold outline-none"
            >
              Signup
            </button>
          </form>
          <p className="py-3 font-semibold">OR</p>
          <button className="w-full rounded-3xl min-h-[44px] relative bg-transparent font-semibold outline-none flex items-center justify-center ">
            { signupOverlay && <GoogleAuth />}
          </button>
          <p className="text-xs text-center mx-6 my-4">
            By continuing, you agree to Showyourworks&apos; <br />
            <strong>Terms of Service</strong> and acknowledge that you&apos;ve
            read our <strong>Privacy Policy</strong>
          </p>
          <p className="text-sm text-center ">
            Already a member?
            <strong
              onClick={() => dispatch(openLogin())}
              className="cursor-pointer"
            >
              Login
            </strong>
          </p>
        </div>
        <IoCloseSharp
          className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
          onClick={() => dispatch(closeSignup())}
        />
      </div>
    </div>
  );
};

export default SignupModal;
