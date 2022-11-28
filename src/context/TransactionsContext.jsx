import { useState, createContext, useContext } from "react";
import { axiosClient } from "../config/axiosClient";
import { toast } from "react-toastify";
import AuthContext from "./AuthContext";
const modalTypes = {
    SUCESS: "success",
    ERROR: "error",
};

const TransactionsContext = createContext();
const TransactionsProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const requestHeaders = { headers: { Authorization: `Bearer ${token}` } }

    const [transactionValues, setTransactionValues] = useState({
        transactions: [],
        transactionsManipulate: [],
        transactionFilters: { name: "", account: "", startDate: "", endDate: "" }
    });

    const handleFilterTransactions = (e) => {
        const { name, value } = e.target;
        setTransactionValues({
            ...transactionValues,
            transactionFilters: {
                ...transactionValues.transactionFilters,
                [name]: value
            }
        });
    }
    const filterTransactions = () => {
        try {
            const { account, endDate, name, startDate } = { ...transactionValues.transactionFilters };
            const newTransactions = [...transactionValues.transactions]
                .filter(transaction => transaction.user !== null)
                .filter(transaction => {
                    if (name.trim().length === 0) {
                        return transaction;
                    } else if (transaction.user.name.trim().toLowerCase().includes(name.trim().toLowerCase())) {
                        return transaction;
                    }
                })
                .filter(transaction => {
                    if (account.trim().length === 0) {
                        return transaction;
                    } else if (transaction.to.accountName.trim().toLowerCase().includes(account.trim().toLowerCase())) {
                        return transaction;
                    }
                })
                .filter(transaction => {
                    const startDateTransaction = new Date(transaction.startDate);
                    const endDateTransaction = new Date(transaction.endDate);
                    const start = new Date(startDate);
                    const end = new Date(endDate);

                    if (start.toLocaleString() === "Invalid Date" && end.toLocaleString() === "Invalid Date") return transaction;
                    else if (start.toLocaleString() !== "Invalid Date" && end.toLocaleString() !== "Invalid Date") {
                        if (end < start)
                            console.log("HERE"); {
                            const errors = [{ msg: "Invalid range date" }]
                            showErrors(errors);
                        }
                        start.setDate(Number(start.getDate() + 1));
                        endDate.setDate(Number(endDate.getDate() + 1));
                        if (start <= startDateTransaction && endDate >= endDateTransaction) return transaction;
                    }
                    else if (start.toLocaleString() !== "Invalid Date") {
                        start.setDate(Number(start.getDate() + 1));
                        if (start <= startDateTransaction) return transaction;
                    } else if (end.toLocaleString() !== "Invalid Date") {
                        endDate.setDate(Number(endDate.getDate() + 1));
                        if (endDate >= endDateTransaction) return transaction;
                    }
                })
            setTransactionValues({ ...transactionValues, transactionsManipulate: newTransactions })
        } catch (error) {
            const errors = [{ msg: "Invalid range date" }]
            showErrors(errors);
            setTransactionValues({
                ...transactionValues, transactionFilters: {
                    ...transactionValues.transactionFilters,
                    startDate: "",
                    endDate: ""
                }
            })
        }
    }
    //Flows
    const loadPage = async () => {
        try {
            const { data: transactions } = await axiosClient.get("/transactionsLog", requestHeaders);
            let transactionsArray = transactions.filter(transaction => transaction.user !== null);
            setTransactionValues({
                ...transactionValues,
                transactions: transactionsArray,
                transactionsManipulate: transactionsArray
            });
        } catch (error) {
            const { errors } = error.response.data;
            showErrors(errors);
        }
    }
    const openToast = (message, type) => {
        const toastConfig = {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        };
        if (type == "error") {
            toastConfig.autoClose = 5000;
            toast.error(message, toastConfig);
        }
        if (type == "success") {
            toast.success(message, toastConfig);
        }
    };
    const showErrors = (errors) => {
        errors.forEach((errorItem) => {
            const { msg } = errorItem;
            openToast(msg, modalTypes.ERROR);
        });
    }
    return (
        <TransactionsContext.Provider
            value={{
                ...transactionValues,
                loadPage,
                filterTransactions,
                handleFilterTransactions
            }}
        >
            {children}
        </TransactionsContext.Provider>
    )
}

export { TransactionsProvider };
export default TransactionsContext;