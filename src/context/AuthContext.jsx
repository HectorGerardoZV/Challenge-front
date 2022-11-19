import { createContext, useState } from "react";
import { axiosClient } from "../config/axiosClient";
import { toast } from "react-toastify";
const modalTypes = {
    SUCESS: "success",
    ERROR: "error",
};

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(
        localStorage.getItem("tokenArkus") ? JSON.parse(localStorage.getItem("tokenArkus")) : null
    );
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const handleOnChangeInputLogin = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };
    const fetchLogin = async () => {
        try {
            const { data } = await axiosClient.post("/auth", credentials);
            if (data.hasOwnProperty("token")) {
                openToast("Welcome!!", modalTypes.SUCESS);
                setToken(data.token);
                setCredentials({
                    email: "",
                    password: "",
                });
                return true;
            }
        } catch (error) {
            const { errors } = error.response.data;
            errors.forEach((errorItem) => {
                const { msg } = errorItem;
                openToast(msg, modalTypes.ERROR);
            });
            return false;
        }
    };
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
    return (
        <AuthContext.Provider
            value={{
                fetchLogin,
                handleOnChangeInputLogin,
                openToast,
                token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
