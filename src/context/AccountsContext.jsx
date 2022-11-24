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
    const { setMessageModal, changeModal, toggleModal } = useContext(ModalContext);
    const [accounts, setAccounts] = useState([]);
    const [accountsManipulate, setAccountsManipulate] = useState([]);
    const [accountInfo, setAccountInfo] = useState({
        accountName: "",
        clientName: "",
        responsible: ""
    });
    const [accountSelected, setAccountSelected] = useState({ idAccount: "", account: "", action: "" });
    const [account, setAccount] = useState(null);

    const fetchAccounts = async () => {
        try {
            const { data } = await axiosClient.get("/accounts", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAccounts(data);
            setAccountsManipulate(data);
        } catch (error) {
            const { errors } = error.response.data;
            errors.forEach((errorItem) => {
                const { msg } = errorItem;
                openToast(msg, modalTypes.ERROR);
            });
        }
    }
    const loadPageAccounts = async () => {
        try {
            await fetchAccounts();
        } catch (error) {

        }
    }
    const handleOnChangeInput = (e) => {
        const { name, value } = e.target;
        setAccountInfo({
            ...accountInfo,
            [name]: value
        });
    }
    const handleResetAccountInfo = () => {
        setAccountInfo({
            accountName: "",
            clientName: "",
            responsible: ""
        });
    }
    const handleSelectAccount = (idAccount, accountName, action) => {
        setAccountSelected({ idAccount, accountName, action });
    }
    const handleFindAccount = async (idAccount) => {
        try {
            const { data } = await axiosClient.get(`/accounts/${idAccount}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAccount(data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleResetAccount = () => {
        setAccount(null);
        setAccountSelected({ idAccount: "", account: "", action: "" });
    }
    //Flows
    const addNewAccout = async () => {
        try {
            await axiosClient.post("/accounts", accountInfo,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            await fetchAccounts();
            setMessageModal({
                type: "success",
                message: "Account successfully created"
            });
            changeModal("Message");
        } catch (error) {
            const { errors } = error.response.data;
            errors.forEach((errorItem) => {
                const { msg } = errorItem;
                openToast(msg, modalTypes.ERROR);
            });
        }
    }
    const actionAccountFlow = async () => {
        const { action, idAccount } = accountSelected;
        await handleFindAccount(idAccount);
        if (action === "delete") {
            toggleModal("OptionAccount");
        }
    }
    const deleteAccountFlow = async (idAccount) => {
        try {
            await axiosClient.delete(`/accounts/${idAccount}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAccount(null);
            fetchAccounts();
            setMessageModal({
                type: "success",
                message: "Account successfully deleted"
            });
            changeModal("Message");
        } catch (error) {
            const { errors } = error.response.data;
            errors.forEach((errorItem) => {
                const { msg } = errorItem;
                openToast(msg, modalTypes.ERROR);
            });
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


    useEffect(() => {
        if (accountSelected.account !== "") {
            actionAccountFlow();
        }
    }, [accountSelected]);
    return (
        <AccountsContext.Provider
            value={{
                accountsManipulate,
                accountInfo,
                account,
                accountSelected,
                loadPageAccounts,
                handleOnChangeInput,
                handleResetAccountInfo,
                addNewAccout,
                handleSelectAccount,
                deleteAccountFlow,
                handleResetAccount,

            }}
        >
            {children}
        </AccountsContext.Provider>
    )
}

export { AccountsProdiver }
export default AccountsContext