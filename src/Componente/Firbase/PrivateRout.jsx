import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import LogingSpiner from "../../Sheare/LogingSpiner";

const PrivateRout = ({ children }) => {
  const { user, loding } = useAuth();
  const location = useLocation();
  if (loding) return <LogingSpiner></LogingSpiner>;
  if (user) return children;
  return (
    <Navigate to="/login" state={location.pathname} replace="true"></Navigate>
  );
};

export default PrivateRout;
