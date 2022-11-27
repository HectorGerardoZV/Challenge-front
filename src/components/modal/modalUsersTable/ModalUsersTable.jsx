
//Hooks
import { useUsers, useModal, useTeams } from "../../../hooks";
//Icons
import ICON_SEACH from "/icons/icon-search.svg";
//Style
import style from "./ModalUsersTable.module.css";
const ModalUsersTable = () => {
    const {
        usersManipulate,
        handleFilterUsers,
        handleOnChangeInputFilter,
        handleResetUserFilter,
        handleAddUserToTeam,
        userToTeam
    } = useUsers();
    const {
        toggleModal
    } = useModal();
    const {
        flowAddUserToTeam
    } = useTeams();

    const handleEnter = (e) => {
        if (e.key.trim() === "Enter") handleFilterUsers();
    }

    const closeModal = () => {
        handleResetUserFilter();
        toggleModal("");
        handleFilterUsers();
    }
    return (
        <div className={style.usersTableModal}>
            <h2>Adding <span>user</span></h2>
            <div className={style.usersTable}>
                <div className={style.usersTable__head}>
                    <input
                        placeholder="Username..."
                        onChange={handleOnChangeInputFilter}
                        onKeyDown={handleEnter}
                    />
                    <button onClick={handleFilterUsers}>
                        <img src={ICON_SEACH} />
                    </button>
                </div>
                <div className={style.usersTable__titles}>
                    <p>Name</p>
                    <p>Email</p>
                    <p>Role</p>
                </div>

                <div className={style.usersTable__body}>
                    {
                        usersManipulate.map((user, index) => {
                            const { _id, name, email, role } = user;
                            return (
                                <div key={index}
                                    className={`${style.userTableRow} ${_id === userToTeam?._id ? style.selected : ""}`}
                                    onClick={() => handleAddUserToTeam(user)}
                                >
                                    <p>{name}</p>
                                    <p>{email}</p>
                                    <p>{role}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={style.usersTable__actions}>
                <button className={style.closeButton} onClick={closeModal}>Close</button>
                <button className={style.aceptButton} onClick={flowAddUserToTeam}>Add User</button>
            </div>
        </div>
    )
}

export default ModalUsersTable;