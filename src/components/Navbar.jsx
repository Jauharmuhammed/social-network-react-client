import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, updateUser } from "redux/userSlice";
import Button from "./Button";

const Navbar = ({ setLoginOverlay, setSignupOverlay, feed }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateUser())
  }, [user])
  
  const handleLogout = () => {
    localStorage.removeItem("token")
    dispatch(removeUser())
    window.location.reload(false)
  }
  return (
    <nav className="flex justify-between items-center w-full rounded-3xl h-20 bg-black bg-opacity-90 px-7 ">
      <div className="font-boogaloo text-yellow text-4xl pb-2">
        showyourwork
      </div>
      <div className="flex gap-5">
        {!feed && (
          <>
            <Button text="Login"  primary onClick={() => setLoginOverlay(true)}/>
            <Button text="Signup" onClick={() => setSignupOverlay(true)} />
          </>
        )}
        {feed && (
          <Button
            text="Log Out"
            onClick={handleLogout}
          />
        )}
        {/* <button className="bg-yellow px-5 py-2 rounded-2xl font-inter font-medium" onClick={()=> setLoginOverlay(true)} >Login</button>
        <button className="bg-white px-5 py-2 rounded-2xl font-inter font-medium">SignUp</button> */}
      </div>
    </nav>
  );
};

export default Navbar;
