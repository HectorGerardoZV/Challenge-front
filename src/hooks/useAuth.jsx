import { useContext } from "react";
import { values } from "../context";
const useAuth = () => {
    return useContext(values.context.AuthContext);
};

export default useAuth;
