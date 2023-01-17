import React from 'react'
import { useDispatch} from "react-redux";
import { openLogin, openSignup } from "features/auth/services/authModalSlice";
import Button from "./Button";
import { logOut } from 'features/auth/services/authSlice';
import { Link } from 'react-router-dom';

const Navbar = ({ landing }) => {
  const dispatch = useDispatch()


  return (
    <nav className="flex justify-between items-center w-full rounded-3xl h-20 px-3 md:px-7 ">
      {/* <div className="font-boogaloo text-custom-yellow text-4xl pb-2">
        showyourwork
      </div> */}
      <Link to='/' className=" text-2xl lg:text-4xl text-custom-yellow font-bold">Showyourwork.</Link>
      <div className="flex  gap-2 md:gap-5">
        {landing && (
          <>
            <Button text="Login" onClick={() => dispatch(openLogin())}/>
            <Button primary className='hidden sm:block' text="Signup" onClick={() => dispatch(openSignup())} />
          </>
        )}
        {!landing && (
          <>
            
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
