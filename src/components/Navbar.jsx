import React from 'react'
import { useDispatch} from "react-redux";
import { openLogin, openSignup } from "features/auth/services/authModalSlice";
import Button from "./Button";
import { logOut } from 'features/auth/services/authSlice';
import { openChatModal } from 'features/chat/services/chatModalSlice';

const Navbar = ({ landing }) => {
  const dispatch = useDispatch()


  return (
    <nav className="flex justify-between items-center w-full rounded-3xl h-20  px-7 ">
      {/* <div className="font-boogaloo text-custom-yellow text-4xl pb-2">
        showyourwork
      </div> */}
      <div className="text-4xl text-custom-yellow font-bold">Showyourwork.</div>
      <div className="flex gap-5">
        {landing && (
          <>
            <Button text="Login"  primary onClick={() => dispatch(openLogin())}/>
            <Button text="Signup" onClick={() => dispatch(openSignup())} />
          </>
        )}
        {!landing && (
          <>
            <Button
              text="Messages"
              onClick={() => dispatch(openChatModal())}
            />
            <Button
              text="Log Out"
              onClick={() => dispatch(logOut())}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
