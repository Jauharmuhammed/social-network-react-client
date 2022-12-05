import LandingPage from "pages/LandingPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "redux/userSlice";
import axios from '../utils/axios'

const PrivateRoute = ({children}) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch()


  const updateToken = () => {
    console.log('update token triggered');
    console.log(token);
    console.log(JSON.parse( token));
    axios
      .post("/token/refresh/", { refresh: JSON.parse(token)?.refresh })
      .then((response) => {
        console.log(response.data);
        dispatch(updateUser(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    const fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (token) {
        dispatch(updateToken());
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [token]);

  return (
    user ? children : <LandingPage/>
  )
}

export default PrivateRoute