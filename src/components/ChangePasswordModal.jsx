import { useChangePassowrdMutation } from "app/api/authApiSlice";
import { closeChangePassword, openLogin } from "features/auth/authModalSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiErrorCircle } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "./ButtonSpinner";

const ChangePasswordModal = ({ uid }) => {
  const changePasswordOverlay = useSelector(
    (state) => state.authModal.changePasswordModal
  );
  const navigate = useNavigate();

  const [changePassword, { isLoading }] = useChangePassowrdMutation();

  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,24}$/;

  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading || !PWD_REGEX.test(password)) return;

    if (!password || !confirmPassword) {
      setErrMsg("Fields cannot be empty.");
      return;
    }

    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match.");
      return;
    }

    console.log(uid);

    try {
      const response = await changePassword({
        password,
        confirm_password: confirmPassword,
        uid,
      }).unwrap();
      console.log(response);
      toast.success("Password changed successfully.", {
        style: {
          borderRadius: "10px",
        },
      });
      dispatch(openLogin())
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrMsg(err);
      navigate("/");
      toast.error("An error occured!, Please contact customer support", {
        style: {
          borderRadius: "10px",
        },
      });
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [password, confirmPassword]);

  return (
    <div
      className={
        (changePasswordOverlay ? "flex" : "hidden") +
        " fixed  inset-0 bg-black bg-opacity-40 backdrop-blur-sm  justify-center items-center"
      }
    >
      {/* overlay */}
      <div
        className={
          (changePasswordOverlay ? "opacity-100" : "translate-y-96 opacity-0") +
          " transform w-[450px] h-fit relative rounded-[2rem] bg-black back text-white p-12 transition-transform duration-1000  mt-16"
        }
      >
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-xl my-5">Change your password</h3>
          <form className="w-full" onSubmit={handleSubmit} autoComplete="none">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300 mb-5 ${
                passwordErr ? "border-red-700" : ""
              }`}
            />
            {passwordErr && (
              <p className="text-red-700 my-1 flex items-start ml-2 text-sm -mt-4">
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300 mb-5"
            />
            {errMsg && (
              <p className="text-red-700 my-1 flex justify-center items-start ml-2 text-sm -mt-4">
                <span className="text-base mt-0.5 mr-1">
                  <BiErrorCircle />
                </span>
                <span>{errMsg}</span>
              </p>
            )}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full rounded-3xl  py-3 px-4 bg-custom-yellow text-black font-semibold outline-none"
            >
              {isLoading ? <ButtonSpinner /> : "Change Password"}
            </button>
          </form>
        </div>
        <IoCloseSharp
          className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
          onClick={() => dispatch(closeChangePassword())}
        />
      </div>
    </div>
  );
};

export default ChangePasswordModal;
