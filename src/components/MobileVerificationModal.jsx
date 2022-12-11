import {
  useLoginWithOtpMutation,
  useSendOtpMutation,
} from "app/api/authApiSlice";
import { closeLoginWithOtp, openLogin } from "features/auth/authModalSlice";
import { setCredentials } from "features/auth/authSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiErrorCircle } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ButtonSpinner from "./ButtonSpinner";

const MobileVerificationModal = () => {
  const [otpSend, setOtpSend] = useState(false);
  const loginWithOtOverlay = useSelector(
    (state) => state.authModal.loginWithOtpModal
  );
  const MOBILE_REGEX = /^[0-9]{10}$/;
  const OTP_REGEX = /^[0-9]{6}$/;

  const [mobile, setMobile] = useState("");
  const [mobileErr, setMobileErr] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState("");

  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const [loginWithOtp, { isLoginLoading } ] = useLoginWithOtpMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    const result = MOBILE_REGEX.test(mobile);
    if (!result && mobile) {
      setMobileErr("Please enter a 10 digit mobile number.");
    } else {
      setMobileErr("");
    }
  }, [mobile]);

  useEffect(() => {
    const result = OTP_REGEX.test(otp);
    if (!result && otp) {
      setOtpErr("OTP must be a 6 digit number");
    } else {
      setOtpErr("");
    }
  }, [otp]);

  useEffect(() => {
    setErrMsg("");
  }, [mobile, otp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mobile) {
      setMobileErr("This field is required");
      return;
    }
    if (!MOBILE_REGEX.test(mobile)) return;

    try {
      const response = await sendOtp({ mobile_number: mobile }).unwrap();
      console.log(response);
      setOtpSend(true);
    } catch (err) {
      setErrMsg(err.data);
    }
  };

  const handleLoginWithOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setOtp("This field is required");
      return;
    }
    if (!OTP_REGEX.test(otp)) return;

    try {
      const response = await loginWithOtp({
        otp,
        mobile_number: mobile,
      }).unwrap();
      console.log(response);
      dispatch(setCredentials(response));
      dispatch(closeLoginWithOtp());
      toast.success("Logged in successfully.", {
        style: {
          borderRadius: "100px",
        },
      });
      setMobile("");
      setOtp("");
    } catch (err) {
      setErrMsg(err.data);
    }
  };

  const handlClose = (e) => {
    if (e.target.id === "loginWithOtpModalContainer")
      dispatch(closeLoginWithOtp());
  };

  const handleGoBack = () => {
    dispatch(closeLoginWithOtp());
    dispatch(openLogin());
  };

  return (
    <>
      <div
        id="loginWithOtpModalContainer"
        onClick={handlClose}
        // className=" fixed  inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center"
        className={
          (loginWithOtOverlay ? "flex" : "hidden") +
          " fixed  inset-0 bg-black bg-opacity-40 backdrop-blur-sm  justify-center items-center"
        }
      >
        {/* overlay */}
        <div
          className={
            (loginWithOtOverlay ? "opacity-100" : "translate-y-96 opacity-0") +
            " transform w-[450px] h-fit relative rounded-[2rem] bg-black back text-white p-12 transition-transform duration-1000  mt-16"
          }
        >
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-xl mt-3">Login With OTP</h3>
            {!otpSend ? (
              <>
                <p className="text-sm text-center my-8">
                  We'll send an OTP to your registered mobile number
                </p>
                <form onSubmit={handleSubmit} className="w-full">
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
                  {errMsg && (
                    <p className="text-red-700 -mt-4 mb-1 flex justify-center items-center text-sm">
                      {errMsg}
                    </p>
                  )}
                  <button
                    disabled={isLoading}
                    className="w-full rounded-3xl  py-3 px-4 bg-custom-yellow text-black font-semibold outline-none"
                  >
                    {isLoading ? <ButtonSpinner /> : "Send OTP"}
                  </button>
                </form>
                <p
                  className="text-base font-semibold text-center my-4 cursor-pointer"
                  onClick={handleGoBack}
                >
                  Go back
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-center my-8">
                  Enter OTP recieved in your mobile number
                </p>
                <form onSubmit={handleLoginWithOtp} className="w-full">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="OTP"
                    pattern="\d{6}"
                    className={`w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300  ${
                      otpErr ? "border-red-700" : "mb-5 "
                    }`}
                  />
                  {otpErr && (
                    <p className="text-red-700  my-1 flex ml-2 items-center text-sm">
                      <BiErrorCircle />
                      &nbsp;{otpErr}
                    </p>
                  )}
                  {errMsg && (
                    <p className="text-red-700 -mt-4 mb-1 flex justify-center items-center text-sm">
                      {errMsg}
                    </p>
                  )}
                  <button
                    disabled={isLoginLoading}
                    className="w-full rounded-3xl  py-3 px-4 bg-custom-yellow text-black font-semibold outline-none"
                  >
                    {isLoginLoading ? <ButtonSpinner /> : "Login With OTP"}
                  </button>
                </form>
                <p
                  className="text-base font-semibold text-center my-4 cursor-pointer"
                  onClick={() => setOtpSend(false)}
                >
                  Didn't recieved the OTP?
                </p>
              </>
            )}
          </div>
          <IoCloseSharp
            className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
            onClick={() => dispatch(closeLoginWithOtp())}
          />
        </div>
      </div>
    </>
  );
};

export default MobileVerificationModal;
