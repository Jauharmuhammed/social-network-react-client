import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({children}) => {
  const user = useSelector((state) => state.auth.user);

  if(!user) return <Navigate to='/'/>

  return user?.is_admin ? children : <Navigate to='/'/>
}

export default AdminRoute