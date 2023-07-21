import { useSelector } from "react-redux"
import Admin from "../views/Admin/Admin";
import { Navigate, useLocation } from "react-router";

const RequireAuth = ({ allowedRole }) => {
  const userLogged = useSelector((state) => state.userLogged);
  const location = useLocation();

  return (
    userLogged?.role === allowedRole
      ? <Admin />
      : <Navigate to="/" state={{ from: location}} replace />
  )
}

export default RequireAuth