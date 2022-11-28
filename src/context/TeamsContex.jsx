import { useState, createContext, useContext } from "react"
import { axiosClient } from "../config/axiosClient";
const TeamsContex = createContext();
import { values } from "../context";
import { toast } from "react-toastify";
const modalTypes = {
    SUCESS: "success",
    ERROR: "error",
};

const TeamsProvider = ({ children }) => {
    const { userToTeam } = useContext(values.context.UsersContext);
    const { account } = useContext(values.context.AccountsContext);
    const { token } = useContext(values.context.AuthContext);
    const { setMessageModal, changeModal } = useContext(values.context.ModalContext);

    const requestHeaders = { headers: { Authorization: `Bearer ${token}` } }


    const [teamValues, setTeamValues] = useState({
        account: null,
        team: null,
        teamSelected: null,
        userSelected: null,
        teamAction: ""
    });

    const handleSelectTeam = (team) => {
        setTeamValues({
            ...teamValues,
            teamSelected: team
        })
    }
    //Flows
    const flowFindATeam = async (idAccount) => {
        try {
            const { data: account } = await axiosClient.get(`/accounts/${idAccount}`, requestHeaders);
            const { data: team } = await axiosClient.get(`/teams/${account.team._id}`, requestHeaders);
            setTeamValues({ ...teamValues, team: team })
        } catch (error) {
            const { errors } = error.response.data;
            showErrors(errors);
        }
    }
    const flowAddUserToTeam = async () => {
        try {
            const { _id: user } = userToTeam;
            const { _id: team } = teamValues.team;
            const userTeam = {
                user,
                team
            }
            const {data:res} = await axiosClient.post("/teams", userTeam, requestHeaders);
            setMessageModal({
                type: "success",
                message: "User successfully added"
            });
            changeModal("Message");
        } catch (error) {
            if(error.response.data.errors){
                const { errors } = error.response.data;
                showErrors(errors);
            }else{
                const {msg} = error.response.data;
                const errors = [{msg}];
                showErrors(errors);
            }
            
        }
    }
    const showErrors = (errors) => {
        errors.forEach((errorItem) => {
            const { msg } = errorItem;
            openToast(msg, modalTypes.ERROR);
        });
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

    return (
        <TeamsContex.Provider
            value={{
                ...teamValues,
                handleSelectTeam,
                flowAddUserToTeam,
                flowFindATeam
            }}
        >
            {children}
        </TeamsContex.Provider>
    )
}
export { TeamsProvider }
export default TeamsContex;