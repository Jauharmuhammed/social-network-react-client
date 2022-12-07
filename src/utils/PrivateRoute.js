import LandingPage from "pages/LandingPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateUser } from "redux/userSlice";
import axios from '../utils/axios'

const PrivateRoute = ({children}) => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch()


  const updateToken = () => {
    console.log('update token triggered');
    axios
      .post("/token/refresh/", { refresh: token?.refresh })
      .then((response) => {
        dispatch(updateUser(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(logoutUser())
      });
  };


  useEffect(() => {
    const fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (token) {
        updateToken()
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [token]);


  return (
    token
      ? children
      : <LandingPage />
  )
}

export default PrivateRoute