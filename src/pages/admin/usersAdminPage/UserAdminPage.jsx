//Components
import {  UserRow } from "../../../components";
//Hooks
import { useUsers, useModal } from "../../../hooks";

//Style
import style from "./UserAdminPage.module.css";
const UserAdminPage = () => {
    const {
        usersManipulate,
        handleFilterUsers,
        handleOnChangeInputFilter,
    } = useUsers();
    const { toggleModal } = useModal();

    return <section className={style.page}>
        <div className={style.page__header}>
            <div className={style.searchSection}>
                <input placeholder="Username..." onChange={handleOnChangeInputFilter} />
                <img src="/icons/icon-search.svg" onClick={handleFilterUsers} />
            </div>
            <button className={style.btnAdd} onClick={() => toggleModal("OptionUser")}>
                <img src="/icons/icon-plus.svg" />
            </button>
        </div>

        <section className={style.tableUsers}>
            <div className={style.tableLayout}>
                <div className={style.headTable}>
                    <p>Name</p>
                    <p>Email</p>
                    <p>Role</p>
                    <p>Actions</p>
                </div>
                <div className={style.tableBody}>
                    {
                        usersManipulate.map((user, i) => (
                            <UserRow
                                key={i}
                                idUser={user._id}
                                name={user.name}
                                email={user.email}
                                role={user.role}
                            />
                        )
                        )
                    }
                </div>
            </div>
        </section>
    </section>
};

export default UserAdminPage;
