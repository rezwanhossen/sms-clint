import { useContext } from "react";
import { AuthContext } from "../Componente/Firbase/AuthProvider";

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
