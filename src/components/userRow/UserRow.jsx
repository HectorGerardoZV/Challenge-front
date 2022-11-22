import PropTypes from "prop-types";
//Components
import { BtnAction } from "../";
//Hooks
import { useUsers } from "../../hooks";
//Icons
import DELTE_ICON from "/icons/icon-delete.svg";
import UPDATE_ICON from "/icons/icon-update.svg";
import VIEW_ICON from "/icons/icon-view.svg";
import style from "./UserRow.module.css";
const UserRow = (props) => {
    const { idUser, name, email, role } = props;
    const { handleSelectUserAction } = useUsers();
    return (
        <div className={style.userInfo}>
            <p>{name}</p>
            <p>{email}</p>
            <p>{role}</p>
            <div className={style.userActions}>
                <BtnAction image={DELTE_ICON}
                    action={() => handleSelectUserAction(idUser, "delete", role)} />
                <BtnAction image={VIEW_ICON}
                    action={() => handleSelectUserAction(idUser, "view", role)} />
                <BtnAction image={UPDATE_ICON}
                    action={() => handleSelectUserAction(idUser, "update", role)} />
            </div>
        </div>
    )
}
UserRow.propTypes = {
    idUser: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
}

export default UserRow