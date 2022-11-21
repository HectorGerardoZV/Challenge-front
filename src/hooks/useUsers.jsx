import { useContext } from "react";
import { values } from "../context";
const useUsers = () => {
    return useContext(values.context.UsersContext);
}

export default useUsers