import { useContext } from "react";
import { AuthContext } from "../Pages/Authentication/Authprovider";


const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
