import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import loading from "../images/preloader.gif";

const PrivateRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <img src={loading} alt="loading" className="loading-img" />;
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
