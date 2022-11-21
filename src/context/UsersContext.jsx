import { createContext, useState, useEffect, useContext } from "react"
import { axiosClient } from "../config/axiosClient";
import AuthContext from "./AuthContext";
import ModalContext from "./ModalContext";
const UsersContext = createContext();
const UsersProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const { setMessageModal, changeModal } = useContext(ModalContext);
    const [users, setUsers] = useState([]);
    const [usersManipulate, setUsersManipulate] = useState([]);
    const [pages, setPages] = useState([1]);
    const [page, setPage] = useState(1);
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
    const [userAction, setUserAction] = useState({ user: null, action: "" });

    const fetchUsers = async (pageSelected) => {
        try {
            const { data } = await axiosClient.get(`/users?page=${pageSelected}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const { totalPages, users: list, page } = data;
            setPage(page);
            setUsers(list);
            setUsersManipulate(list);
            let pagesOptions = [];
            for (let i = 1; i <= totalPages; i++) pagesOptions.push(i);
            setPages(pagesOptions);
        } catch (error) {
            console.log(error);
            console.log(error.response);
        }
    }
    const fetchRoles = async () => {
        try {
            const { data } = await axiosClient.get("/roles", { headers: { Authorization: `Bearer ${token}` } });
            setRoles(data);
        } catch (error) {

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
    const handleOnClickNewPageUsers = (pageSelected) => {
        fetchUsers(pageSelected);
    }
    const handleOnChangeUser = (e) => {
        const { value, name } = e.target;
        setUser({
            ...user,
            [name]: value
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
                await fetchUsers(1);
                setMessageModal({
                    type: "success",
                    message: "User successfully created"
                });
                changeModal("Message");
                return data;
            } catch (error) {
                console.log(error.response);
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

        }
    }


    useEffect(() => {
        fetchUsers(1);
        fetchRoles();
    }, [])



    return (
        <UsersContext.Provider
            value={{
                usersManipulate,
                pages,
                page,
                flowAddUserAdmin,
                flowAddUserNormal,
                handleFilterUsers,
                handleOnChangeInputFilter,
                handleOnClickNewPageUsers,
                handleOnChangeUser
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}
export { UsersProvider };
export default UsersContext