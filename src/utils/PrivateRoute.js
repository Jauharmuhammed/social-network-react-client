import LandingPage from "pages/LandingPage";
import { useSelector } from "react-redux";

const PrivateRoute = ({children}) => {
  const user = useSelector((state) => state.user);

  return (
    user ? children : <LandingPage/>
  )
}

export default PrivateRoute