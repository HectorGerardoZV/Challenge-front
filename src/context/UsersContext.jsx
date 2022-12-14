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
const ROLE1 = import.meta.env.VITE_ROLE1//Admin
const ROLE2 = import.meta.env.VITE_ROLE2//SuperAdmin
const ROLE3 = import.meta.env.VITE_ROLE3//Normal

const UsersProvider = ({ children }) => {
    const { token, userRole,userId } = useContext(AuthContext);
    const { setMessageModal, changeModal, toggleModal } = useContext(ModalContext);
    const requestHeaders = { headers: { Authorization: `Bearer ${token}` } }

    const [userValues, setUserValues] = useState({
        users: [],
        usersManipulate: [],
        nameFiler: "",
        roles: [],
        user: "",
        userSelected: null,
        userAction: { user: null, action: "", role: "" },
        userInfo: {
            name: "",
            email: "",
            password: "",
            englishLevel: "",
            technicalKnowledge: "",
            linkCV: "",
            role: "",
            user: "",
        },
        userToTeam: null
    });
    const fetchUsers = async () => {
        if (userRole !== ROLE3) {
            try {
                const { data: roleList } = await axiosClient.get("/roles", requestHeaders);
                const { data: userList } = await axiosClient.get("/users", requestHeaders);
                let newUserList = [];
                if (userRole === ROLE1) {
                    newUserList = userList.filter(userItem => userItem.role !== ROLE1)
                        .filter(userItem => userItem.role !== ROLE2);
                } else if (userRole === ROLE2) {
                    newUserList = userList.filter(userItem => userItem.role !== ROLE2);
                } else {
                    newUserList = [...userList];
                }
                setUserValues({ ...userValues, users: newUserList, roles: roleList, usersManipulate: newUserList });
            } catch (error) {
                const { errors } = error.response.data;
                showErrors(errors);
            }
        }
    }
    const fetchUser = async()=>{
        try {
            const {data} = await axiosClient.get(`/profiles/normal/${userId}`,requestHeaders);
            setUserValues({...userValues,user:data});
        } catch (error) {
            
        }
    }
    const handleOnChangeInputFilter = (e) => {
        const newValues = { ...userValues };
        newValues.nameFiler = e.target.value;
        setUserValues(newValues);
    }
    const handleFilterUsers = () => {
        let newUsers = [];
        if (userValues.nameFiler.trim().length > 0) {
            newUsers = [...userValues.users].filter(userItem =>
                userItem.name.toLowerCase().trim().includes(userValues.nameFiler.toLowerCase().trim()))
        } else {
            newUsers = [...userValues.users];
        }
        setUserValues({ ...userValues, usersManipulate: newUsers });
    }
    const handleOnChangeUser = (e) => {
        const { value, name } = e.target;
        setUserValues({
            ...userValues, userInfo: {
                ...userValues.userInfo,
                [name]: value
            }
        });
    }
    const handleSelectUserAction = (userSelected, actionSelected, roleSelected) => {
        setUserValues({
            ...userValues,
            userAction: {
                user: userSelected,
                action: actionSelected,
                role: roleSelected
            }
        });
    }

    const resetUserInfo = () => {
        setUserValues({
            ...userValues, userInfo: {
                name: "",
                email: "",
                password: "",
                englishLevel: "",
                technicalKnowledge: "",
                linkCV: "",
                role: "",
                user: "",
            },
            userAction: { user: null, action: "", role: "" },
            userSelected: null
        });
    }
    const resetUserSelected = () => {
        setUserValues({ ...userValues, userSelected: null });
    }
    const handleResetUserFilter = () => {
        const newValues = { ...userValues };
        newValues.nameFiler = "";
        setUserValues(newValues);
    }
    const handleAddUserToTeam = (user) => {
        setUserValues({
            ...userValues,
            userToTeam: user
        });
    }
    //Flows
    const flowAddUserAdmin = async () => {
        try {
            const userToAdd = { ...userValues.userInfo };
            const roleFound = userValues.roles.find(role => role.name === ROLE1);
            userToAdd.role = roleFound._id;
            await axiosClient.post("/users", userToAdd, requestHeaders);
            setUserValues({
                ...userValues,
                userInfo: {
                    name: "",
                    email: "",
                    password: "",
                    englishLevel: "",
                    technicalKnowledge: "",
                    linkCV: "",
                    role: "",
                    user: "",
                },
                userAction: { user: null, action: "", role: "" }
            })
            await fetchUsers();
            setMessageModal({
                type: "success",
                message: "User successfully created"
            });
            changeModal("Message");
        } catch (error) {
            const { errors } = error.response.data;
            showErrors(errors);
        }
    }
    const flowAddUserNormal = async () => {
        const userToAdd = { ...userValues.userInfo };
        let errors = [];
        if (userToAdd.englishLevel.trim().length < 1) errors.push({ msg: "English level is too short" });
        if (userToAdd.linkCV.trim().length < 1) errors.push({ msg: "CV Link is too short" })
        if (userToAdd.technicalKnowledge.trim().length < 5) errors.push({ msg: "Technical knowledge is too short" })
        if (errors.length !== 0) return showErrors(errors);

        const roleFound = userValues.roles.find(role => role.name === ROLE3);
        userToAdd.role = roleFound._id;
        try {
            const { data: userAdded } = await axiosClient.post("/users", userToAdd, requestHeaders);
            userToAdd.user = userAdded._id;
            await axiosClient.post("/profiles/normal", userToAdd, requestHeaders);
            setMessageModal({
                type: "success",
                message: "User successfully updated"
            });
            changeModal("Message");
            await fetchUsers();
        } catch (error) {
            const { errors } = error.response.data;
            showErrors(errors);
        }
    }
    const fetchUserSelected = async () => {
        try {
            if (userValues.userAction.user) {
                if (userValues.userAction.role === ROLE3) {
                    const { data: userFound } = await axiosClient.get(`/profiles/normal/${userValues.userAction.user}`,
                        requestHeaders
                    )
                    setUserValues({ ...userValues, userSelected: userFound })
                    toggleModal("UserNormal");
                } else {
                    const { data: userFound } = await axiosClient.get(`/users/${userValues.userAction.user}`,
                        requestHeaders
                    )
                    setUserValues({ ...userValues, userSelected: userFound })
                    toggleModal("UserAdmin");
                }
            }
        } catch (error) {
            const { errors } = error.response.data;
            showErrors(errors);
        }
    }
    const flowActionUser = async () => {
        const { action } = userValues.userAction;
        if (action === "update") await flowUpdateUser();
        else if (action === "delete") await flowDeleteUser();
    }
    const flowUpdateUser = async () => {
        try {
            const { role } = userValues.userAction;
            const entries = Object.entries({ ...userValues.userInfo });
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
            await axiosClient.put(`/users/${userValues.userAction.user}`, newUserInfo, requestHeaders);
            if (role === ROLE3) await axiosClient.put(`/profiles/normal/${userValues.userAction.user}`, newUserInfo, requestHeaders);
            await fetchUsers();
            setMessageModal({
                type: "success",
                message: "User successfully updated"
            });
            changeModal("Message");

        } catch (error) {
            const { errors } = error.response.data;
            showErrors(errors);
        }
    }
    const flowDeleteUser = async () => {
        try {
            await axiosClient.delete(`/users/${userValues.userAction.user}`, requestHeaders)
            await fetchUsers();
            setMessageModal({
                type: "success",
                message: "User successfully deleted"
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
    useEffect(() => {
        if (token) {
            fetchUsers();
        }
    }, [token, userValues.userRole])
    useEffect(() => {
        if (token) {
            fetchUserSelected();
        }
    }, [userValues.userAction])

    return (
        <UsersContext.Provider
            value={{
                ...userValues,
                flowAddUserAdmin,
                flowAddUserNormal,
                handleFilterUsers,
                handleOnChangeInputFilter,
                handleOnChangeUser,
                handleSelectUserAction,
                resetUserInfo,
                flowActionUser,
                resetUserSelected,
                handleAddUserToTeam,
                handleResetUserFilter,
                fetchUser,
                fetchUsers
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}
export { UsersProvider };
export default UsersContext