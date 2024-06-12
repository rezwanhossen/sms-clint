import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";
import LogingSpiner from "../../Sheare/LogingSpiner";

const Adminrouter = ({ children }) => {
  const { user, loding } = useAuth();
  const [isAdmin, isLoading] = useAdmin();
  const location = useLocation();
  if (loding || isLoading) return <LogingSpiner></LogingSpiner>;
  if (user && isAdmin) return children;
  return (
    <Navigate to="/login" state={location.pathname} replace="true"></Navigate>
  );
};

export default Adminrouter;
