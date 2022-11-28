import { createContext, useEffect, useState } from "react";
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
    const [userRole, setUserRole] = useState(
        localStorage.getItem("userRole") ? JSON.parse(localStorage.getItem("userRole")) : null
    );
    const [userId, setUserId] = useState(
        localStorage.getItem("userId") ? JSON.parse(localStorage.getItem("userId")) : null
    )

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
                localStorage.setItem("tokenArkus", JSON.stringify(data.token));
                return data.token;
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
    const fetchValidateCredential = async (tokenAuth) => {
        try {
            const { data } = await axiosClient.get("/auth", {
                headers: {
                    Authorization: `Bearer ${tokenAuth}`,
                },
            });
            if (!data.hasOwnProperty("role")) return false;
            const { role, id } = data;
            setUserRole(role);
            setUserId(id);
            localStorage.setItem("userRole", JSON.stringify(role));
            localStorage.setItem("userId", JSON.stringify(id));
            return true;
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
    //Flows
    const loginFlow = async () => {
        const tokenAuth = await fetchLogin();
        const resultToken = await fetchValidateCredential(tokenAuth);
        return resultToken;
    };
    const validateCredentialsLocal = async () => {
        if (localStorage.getItem("tokenArkus")) {
            await fetchValidateCredential(JSON.parse(localStorage.getItem("tokenArkus")))
        }
    }

    useEffect(() => {
        if (token) {
            validateCredentialsLocal();
        } else {
            console.log(localStorage.get("tokenArkus"));
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                handleOnChangeInputLogin,
                openToast,
                loginFlow,
                token,
                userRole,
                userId
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
