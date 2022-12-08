import React from 'react'
import { useDispatch} from "react-redux";
import { openLogin, openSignup } from "redux/authModalSlice";
import { logoutUser } from "redux/userSlice";
import Button from "./Button";

const Navbar = ({ feed }) => {
  const dispatch = useDispatch()


  return (
    <nav className="flex justify-between items-center w-full rounded-3xl h-20 bg-black bg-opacity-90 px-7 ">
      <div className="font-boogaloo text-yellow text-4xl pb-2">
        showyourwork
      </div>
      <div className="flex gap-5">
        {!feed && (
          <>
            <Button text="Login"  primary onClick={() => dispatch(openLogin())}/>
            <Button text="Signup" onClick={() => dispatch(openSignup())} />
          </>
        )}
        {feed && (
          <Button
            text="Log Out"
            onClick={() => dispatch(logoutUser())}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
