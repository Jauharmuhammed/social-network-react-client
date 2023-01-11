import React from 'react'
import { useDispatch, useSelector} from "react-redux";
import { openLogin, openSignup } from "features/auth/services/authModalSlice";
import Button from "./Button";
import { logOut } from 'features/auth/services/authSlice';
import { openChatModal } from 'features/chat/services/chatModalSlice';
import { Link } from 'react-router-dom';

const Navbar = ({ landing }) => {
  const dispatch = useDispatch()
  const unreadMessageCount = useSelector(state => state.chatNotification.unreadMessageCount)


  return (
    <nav className="flex justify-between items-center w-full rounded-3xl h-20  px-7 ">
      {/* <div className="font-boogaloo text-custom-yellow text-4xl pb-2">
        showyourwork
      </div> */}
      <Link to='/' className="text-4xl text-custom-yellow font-bold">Showyourwork.</Link>
      <div className="flex gap-5">
        {landing && (
          <>
            <Button text="Login"  primary onClick={() => dispatch(openLogin())}/>
            <Button text="Signup" onClick={() => dispatch(openSignup())} />
          </>
        )}
        {!landing && (
          <>
            <div className='relative'>
              <Button
                text="Messages"
                onClick={() => dispatch(openChatModal())}
              />
              {unreadMessageCount > 0 && <span className='absolute -right-2 -top-2 px-2 bg-custom-yellow text-black rounded-full'>{unreadMessageCount}</span>}
            </div>
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
