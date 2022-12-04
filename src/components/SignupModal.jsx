import { AiOutlineGoogle } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";


const SignupModal = ({ signupOverlay, setSignupOverlay, setLoginOverlay }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlClose = (e) => {
    if (e.target.id === "signupModalContainer") setSignupOverlay(false);
  };

  const handleModalChange = () => {
    setSignupOverlay(false)
    setLoginOverlay(true)
  }

  const Eye = ({ handleVisibility }) => {
    const style = "absolute right-5 top-1/2 translate-y-[10%] cursor-pointer";
    if (!passwordVisibility) {
      return <BsEyeSlash className={style} onClick={handleVisibility} />;
    }
    return <BsEye className={style} onClick={handleVisibility} />;
  };
  return (
    <div
          id="signupModalContainer"
          onClick={handlClose}
          className={ (signupOverlay ? "flex" : 'hidden') + " fixed  inset-0 bg-black bg-opacity-40 backdrop-blur-sm  justify-center items-center"}
        >
           {/* overlay */}
          <div className={( signupOverlay? 'opacity-100' : 'translate-y-96 opacity-0') + ' transform w-[450px] h-fit relative rounded-[2rem] bg-black back text-white p-12 transition-transform duration-1000  mt-16' } >
            <div className="flex flex-col items-center">
              <h1 className="font-boogaloo text-yellow text-5xl pb-2 mt-4">
                showyourwork
              </h1>
              <h3 className="font-semibold text-xl mt-3">Signup</h3>
              <input type="email" placeholder="Email" autoFocus className="w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300 mt-5"  />
              <input  type="text" placeholder="Mobile Number"  className="w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300 mt-5"/>
              <div className="w-full h-fit relative">
                <input className="w-full relative rounded-3xl border border-white py-3 px-4 bg-transparent outline-none placeholder:text-zinc-300 mt-5"
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="Password"
                />
                <Eye
                  handleVisibility={() =>
                    setPasswordVisibility(!passwordVisibility)
                  }
                />
              </div>
              <button className="w-full rounded-3xl mt-5 py-3 px-4 bg-yellow text-black font-semibold outline-none">
                Signup
              </button>
              <p className="py-3 font-semibold">OR</p>
              <button className="w-full rounded-3xl  py-3 px-4 bg-white text-black font-semibold outline-none flex items-center justify-center gap-2">
                <AiOutlineGoogle className="inline text-2xl" /> Continue with
                google
              </button>
              <p className="text-xs text-center mx-6 my-4">
                By continuing, you agree to Showyourworks' <br />{" "}
                <strong>Terms of Service</strong> and acknowledge that you've
                read our <strong>Privacy Policy</strong>
              </p>
              <p className="text-sm text-center ">
               Already a member? <strong onClick={handleModalChange} className='cursor-pointer'>Login</strong>
              </p>
            </div>
            <IoCloseSharp
              className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
              onClick={() => setSignupOverlay(false)}
            />
          </div>
        </div>
  );
};

export default SignupModal;
