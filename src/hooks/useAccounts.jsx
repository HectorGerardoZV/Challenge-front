import { useContext } from "react";
import { values } from "../context";

const useAccounts = () => {
    return useContext(values.context.AccountsContext);
}

export default useAccounts