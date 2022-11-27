import { createContext, useState, useContext, useEffect } from "react"
import { axiosClient } from "../config/axiosClient";
import { toast } from "react-toastify";
const modalTypes = {
    SUCESS: "success",
    ERROR: "error",
};
//Hooks
import AuthContext from "./AuthContext";
import ModalContext from "./ModalContext";
const AccountsContext = createContext();
const AccountsProdiver = ({ children }) => {
    const { token } = useContext(AuthContext);
    const requestHeaders = { headers: { Authorization: `Bearer ${token}` } }
    const { setMessageModal, changeModal, toggleModal } = useContext(ModalContext);
    const [accountValues, setAccountValues] = useState({
        accounts: [],
        accountsManipulate: [],
        accountSelected: { idAccount: "", account: "", action: "" },
        accountInfo: { accountName: "", clientName: "", responsible: "" },
        account: null,
        loadingAccount: false

    });

    const fetchAccounts = async () => {
        try {
            const { data } = await axiosClient.get("/accounts", requestHeaders);
            setAccountValues({
                ...accountValues,
                accounts: data,
                accountsManipulate: data
            });
        } catch (error) {
            const { errors } = error.response.data;
            showErrors(errors);
        }
    }
    const loadPageAccounts = async () => {
        try {
            await fetchAccounts();
        } catch (error) {
            const { errors } = error.response.data;
            showErrors(errors);
        }
    }
    const handleOnChangeInput = (e) => {
        const { name, value } = e.target;
        setAccountValues({
            ...accountValues,
            accountInfo: {
                ...accountValues.accountInfo,
                [name]: value
            }
        });
    }
    const handleResetAccountInfo = () => {
        setAccountValues({
            ...accountValues,
            accountInfo: { accountName: "", clientName: "", responsible: "" }
        });
    }
    const handleSelectAccount = (idAccount, accountName, action) => {
        localStorage.setItem("accountAction", JSON.stringify(action));
        setAccountValues({
            ...accountValues,
            accountSelected: { idAccount, accountName, action }
        })
    }
    const handleFindAccount = async (idAccount) => {
        try {
            const { data } = await axiosClient.get(`/accounts/${idAccount}`, requestHeaders);
            setAccountValues({
                ...accountValues,
                account: data
            });
        } catch (error) {
            const { errors } = error.response.data;
            showErrors(errors);
        }
    }
    const handleResetAccount = () => {
        setAccountValues({
            ...accountValues,
            account: null,
            accountSelected: { idAccount: "", account: "", action: "" }
        });
    }

    //Flows
    const addNewAccout = async () => {
        try {
            await axiosClient.post("/accounts", accountValues.accountInfo, requestHeaders);
            await fetchAccounts();
            setMessageModal({
                type: "success",
                message: "Account successfully created"
            });
            changeModal("Message");
        } catch (error) {
            const { errors } = error.response.data;
            showErrors(errors);
        }
    }
    const actionAccountFlow = async () => {
        const { action, idAccount } = { ...accountValues.accountSelected };
        await handleFindAccount(idAccount);
        if (action === "delete") {
            toggleModal("OptionAccount");
        }
    }
    const deleteAccountFlow = async (idAccount) => {
        try {
            await axiosClient.delete(`/accounts/${idAccount}`, requestHeaders);
            setAccountValues({
                ...accountValues,
                account: null,
            });
            await fetchAccounts();
            setMessageModal({
                type: "success",
                message: "Account successfully deleted"
            });
            changeModal("Message");
        } catch (error) {
            const { errors } = error.response.data;
            showErrors(errors);
        }
    }
    const updateAccountFlow = async () => {
        try {
            const { _id: idAccount } = { ...accountValues.account };
            let values = Object.entries({ ...accountValues.accountInfo }).filter(account => account[1] !== "");
            let newAccount = {};
            values.forEach(account => newAccount[account[0]] = account[1]);
            await axiosClient.put(`/accounts/${idAccount}`, newAccount, requestHeaders);
            await fetchAccounts();
            toggleModal("Success");
            setMessageModal({
                type: "success",
                message: "Account successfully updated"
            });
            changeModal("Message");
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
    const loadPage = async (idAccount) => {
        const action = JSON.parse(localStorage.getItem("accountAction"));
        const accoutSelected = { ...accountValues };
        accoutSelected.accountSelected.action = action;
        setAccountValues(accoutSelected);
        try {
            const { data } = await axiosClient.get(`/accounts/${idAccount}`, requestHeaders);
            const newAccountValues = { ...accountValues };
            newAccountValues.account = data;
            setAccountValues(newAccountValues);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (accountValues.accountSelected.account !== "") {
            actionAccountFlow();
        }
    }, [accountValues.accountSelected]);
    return (
        <AccountsContext.Provider
            value={{
                ...accountValues,
                loadPageAccounts,
                handleOnChangeInput,
                handleResetAccountInfo,
                addNewAccout,
                handleSelectAccount,
                deleteAccountFlow,
                handleResetAccount,
                loadPage,
                updateAccountFlow
            }}
        >
            {children}
        </AccountsContext.Provider>
    )
}

export { AccountsProdiver }
export default AccountsContext