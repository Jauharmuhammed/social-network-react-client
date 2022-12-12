import LandingPage from "pages/LandingPage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setCredentials } from "features/auth/authSlice";
import axios from '../utils/axios'

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)


  const updateToken = () => {
    if (!token) return
    console.log('update token triggered');

    axios
      .post("/token/refresh/", { refresh: token?.refresh })
      .then((response) => {
        dispatch(setCredentials(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(logOut())
      });
    
    if (loading){
      setLoading(false)
    }
  };


  useEffect(() => {
    if (loading) {
      updateToken()
    }

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