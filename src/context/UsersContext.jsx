import { createContext, useState, useEffect, useContext } from "react"
import { axiosClient } from "../config/axiosClient";
import { toast } from "react-toastify";

import AuthContext from "./AuthContext";
import ModalContext from "./ModalContext";
const UsersContext = createContext();
const modalTypes = {
    SUCESS: "success",
    ERROR: "error",
};

const UsersProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const { setMessageModal, changeModal, toggleModal } = useContext(ModalContext);
    const [users, setUsers] = useState([]);
    const [usersManipulate, setUsersManipulate] = useState([]);
    const [nameFiler, setNameFiler] = useState("");
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        englishLevel: "",
        technicalKnowledge: "",
        linkCV: "",
        role: "",
        user: "",

    });
    const [userSelected, setUserSelected] = useState(null);
    const [userAction, setUserAction] = useState({ user: null, action: "", role: "" });

    const fetchUsers = async () => {
        try {
            const { data: userList } = await axiosClient.get("/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUsers(userList);
            setUsersManipulate(userList);
        } catch (error) {
            const { errors } = error.response.data;
            errors.forEach((errorItem) => {
                const { msg } = errorItem;
                openToast(msg, modalTypes.ERROR);
            });
        }
    }
    const fetchRoles = async () => {
        try {
            const { data } = await axiosClient.get("/roles", { headers: { Authorization: `Bearer ${token}` } });
            setRoles(data);
        } catch (error) {
            const { errors } = error.response.data;
            errors.forEach((errorItem) => {
                const { msg } = errorItem;
                openToast(msg, modalTypes.ERROR);
            });
        }
    }
    const handleOnChangeInputFilter = (e) => {
        setNameFiler(e.target.value)
    }
    const handleFilterUsers = () => {
        let newUsers = [];
        if (nameFiler.trim().length > 0) {
            newUsers = [...users].filter(userItem =>
                userItem.name.toLowerCase().trim().includes(nameFiler.toLowerCase().trim()))
        } else {
            newUsers = [...users];
        }
        setUsersManipulate(newUsers)
    }
    const handleOnChangeUser = (e) => {
        const { value, name } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }
    const handleSelectUserAction = (userSelected, actionSelected, roleSelected) => {
        setUserAction({
            user: userSelected,
            action: actionSelected,
            role: roleSelected
        })
    }
    const resetUserInfo = () => {
        setUser({
            name: "",
            email: "",
            password: "",
            englishLevel: "",
            technicalKnowledge: "",
            linkCV: "",
            role: "",
            user: "",

        });
    }
    //Flows
    const flowAddUser = async (role) => {
        const roleFound = roles.find(roleItem => roleItem.name === role);
        if (roleFound) {
            const userToAdd = { ...user }
            userToAdd.role = roleFound._id;
            try {
                const { data } = await axiosClient.post("/users", userToAdd, { headers: { Authorization: `Bearer ${token}` } });
                setUser({
                    name: "",
                    email: "",
                    password: "",
                    role: ""
                });
                await fetchUsers();
                setMessageModal({
                    type: "success",
                    message: "User successfully created"
                });
                changeModal("Message");
                return data;
            } catch (error) {
                const { errors } = error.response.data;
                errors.forEach((errorItem) => {
                    const { msg } = errorItem;
                    openToast(msg, modalTypes.ERROR);
                });
            }

        }
    }
    const flowAddUserAdmin = async () => {
        await flowAddUser("Admin");
    }
    const flowAddUserNormal = async () => {
        const user = await flowAddUser("Normal");
        await flowAddNormalUserProfile(user._id);
    }
    const flowAddNormalUserProfile = async (idUser) => {
        const userProfile = {
            ...user
        }
        userProfile.user = idUser;
        try {
            await axiosClient.post("/profiles/normal", userProfile, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessageModal({
                type: "success",
                message: "User successfully created"
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
    const fetchUserSelected = async () => {
        try {
            if (userAction.user) {
                if (userAction.role === "Normal") {
                    const { data: userFound } = await axiosClient.get(`/profiles/normal/${userAction.user}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    setUserSelected(userFound)
                    toggleModal("UserNormal");
                } else {
                    const { data: userFound } = await axiosClient.get(`/users/${userAction.user}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    setUserSelected(userFound)
                    toggleModal("UserAdmin");
                }
            }
        } catch (error) {
            const { errors } = error.response.data;
            errors.forEach((errorItem) => {
                const { msg } = errorItem;
                openToast(msg, modalTypes.ERROR);
            });
        }
    }
    const flowActionUser = async () => {
        const { action } = userAction;
        if (action === "update") await flowUpdateUser();
        else if (action === "delete") await flowDeleteUser();
    }
    const flowUpdateUser = async () => {
        try {
            const entries = Object.entries({ ...user });
            let newUserInfo = {};
            entries.forEach(entry => {
                const [key, value] = entry;
                if (value.trim().length > 0) {
                    newUserInfo = {
                        ...newUserInfo,
                        [key]: value
                    }
                }
            });

            await axiosClient.put(`/users/${userSelected.user._id}`, newUserInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await fetchUsers();
            setMessageModal({
                type: "success",
                message: "User successfully updated"
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
    const flowDeleteUser = async () => {
        try {
            await axiosClient.delete(`/users/${userAction.user}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await fetchUsers();
            setMessageModal({
                type: "success",
                message: "User successfully deleted"
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
        fetchUsers();
        fetchRoles();
    }, [])
    useEffect(() => {
        fetchUserSelected();
    }, [userAction])

    return (
        <UsersContext.Provider
            value={{
                usersManipulate,
                userAction,
                userSelected,
                flowAddUserAdmin,
                flowAddUserNormal,
                handleFilterUsers,
                handleOnChangeInputFilter,
                handleOnChangeUser,
                handleSelectUserAction,
                setUserSelected,
                resetUserInfo,
                flowActionUser
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}
export { UsersProvider };
export default UsersContext