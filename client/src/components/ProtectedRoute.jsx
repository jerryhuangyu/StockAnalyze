import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, redirectPath = "/login" }) => {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return <Navigate replace to={redirectPath} />;
  }
  return children ? children : <Outlet />;
};
export default ProtectedRoute;
