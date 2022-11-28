import { useContext } from "react";
import { values } from "../context";
const useTransactions = () => {
    return useContext(values.context.TransactionsContext);
}

export default useTransactions;