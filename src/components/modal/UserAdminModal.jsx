//Components
import { Input } from "../../components";

//Hooks
import { useModal, useUsers } from "../../hooks";

//Icons
import ICON_LOGO from "/icons/icon-logo.svg";
//Style
import style from "./UserModal.module.css"
const UserAdminModal = () => {
  const { toggleModal } = useModal();
  const { handleOnChangeUser, flowAddUserAdmin } = useUsers();
  return (
    <div className={style.modal}>
      <div className={style.modal__header}>
        <img src={ICON_LOGO} />
        <h3>Creating Admin User</h3>
      </div>
      <div className={style.modal__inputs}>
        <Input
          type={"text"}
          label={"Name"}
          handleFunction={handleOnChangeUser}
          name={"name"}
          placeholder={"Name..."}
        />
        <Input
          type={"email"}
          label={"Email"}
          handleFunction={handleOnChangeUser}
          name={"email"}
          placeholder={"Email..."}
        />
        <Input
          type={"text"}
          label={"Password"}
          handleFunction={handleOnChangeUser}
          name={"password"}
          placeholder={"Password..."}
        />
      </div>
      <div className={style.modal__option}>
        <button className={style.btnCancel} onClick={() => toggleModal("")}>Cancel</button>
        <button className={style.btnAcept} onClick={flowAddUserAdmin}>Create</button>
      </div>
    </div>
  )
}

export default UserAdminModal