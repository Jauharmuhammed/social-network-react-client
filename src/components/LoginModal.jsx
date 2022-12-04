import React, { useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { updateUser } from "redux/userSlice";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ loginOverlay, setLoginOverlay, setSignupOverlay }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const dispatch = useDispatch();

  const loginUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const data = {
      email,
      password,
    };

    axios.post("/token/", data).then((response) => {
      localStorage.setItem("token", JSON.stringify(response.data));
      console.log(response);
      const userData = jwtDecode(response.data.access);
      dispatch(updateUser(userData));
      window.location.reload(false)
    });
  };
  const handlClose = (e) => {
    if (e.target.id === "loginModalContainer") {
      setLoginOverlay(false);
    }
  };

  const handleModalChange = () => {
    if (loginOverlay) {
      setLoginOverlay(false);
      setSignupOverlay(true);
    }
  };

  const Eye = ({ handleVisibility }) => {
    const style = "absolute right-5 top-1/2 translate-y-[10%] cursor-pointer";
    if (!passwordVisibility) {
      return <BsEyeSlash className={style} onClick={handleVisibility} />;
    }
    return <BsEye className={style} onClick={handleVisibility} />;
  };

  return (
    <>
      {loginOverlay && (
        <div
          id="loginModalContainer"
          onClick={handlClose}
          className=" fixed  inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center"
        >
          {/* overlay */}
          <div className="w-[450px] h-fit relative rounded-[2rem] bg-black back text-white p-12 transition-all duration-300  mt-16">
            <div className="flex flex-col items-center">
              <h1 className="font-boogaloo text-yellow text-5xl pb-2 mt-4">
                showyourwork
              </h1>
              <h3 className="font-semibold text-xl mt-3">Login</h3>
              <form onSubmit={loginUser} className="w-full text-center">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  autoFocus
                  className="w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300 mt-5"
                />
                <div className="w-full h-fit relative">
                  <input
                    className="w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300 mt-5"
                    type={passwordVisibility ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                  />
                  <Eye
                    handleVisibility={() =>
                      setPasswordVisibility(!passwordVisibility)
                    }
                  />
                </div>
                <p className="font-medium text-sm mt-3">Forgot Password?</p>
                <button className="w-full rounded-3xl mt-5 py-3 px-4 bg-yellow text-black font-semibold outline-none">
                  Login
                </button>
              </form>
              <p className="py-3 font-semibold">OR</p>
              <button className="w-full rounded-3xl  py-3 px-4 bg-white text-black font-semibold outline-none flex items-center justify-center gap-2">
                <AiOutlineGoogle className="inline text-2xl" /> Continue with
                google
              </button>
              <p className="text-xs text-center mx-6 my-4">
                By continuing, you agree to Showyourworks' <br />
                <strong>Terms of Service</strong> and acknowledge that you've
                read our <strong>Privacy Policy</strong>
              </p>
              <p className="text-sm text-center ">
                Not on Showyourwork yet?
                <strong onClick={handleModalChange} className="cursor-pointer">
                  Sign up
                </strong>
              </p>
            </div>
            <IoCloseSharp
              className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
              onClick={() => setLoginOverlay(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
