import { createContext, useState, useEffect, useContext } from "react"
import { axiosClient } from "../config/axiosClient";
import AuthContext from "./AuthContext";
const UsersContext = createContext();
const UsersProvider = ({ children }) => {

    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [usersManipulate, setUsersManipulate] = useState([]);
    const [pages, setPages] = useState([1]);
    const [page, setPage] = useState(1);
    const [nameFiler, setNameFiler] = useState("");

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
            console.log(error.response);
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




    useEffect(() => {
        fetchUsers(1);
    }, [])



    return (
        <UsersContext.Provider
            value={{
                usersManipulate,
                pages,
                page,
                handleFilterUsers,
                handleOnChangeInputFilter,
                handleOnClickNewPageUsers
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}
export { UsersProvider };
export default UsersContext