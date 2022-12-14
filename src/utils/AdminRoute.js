import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = useSelector((state) => state.auth.user);

  return user?.is_admin ? <Outlet/> : <Navigate to='/'/>
}

export default AdminRoute