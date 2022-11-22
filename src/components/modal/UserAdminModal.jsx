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
  const {
    resetUserInfo,
    handleSelectUserAction,
    setUserSelected,
    handleOnChangeUser,
    flowAddUserAdmin,
    userAction,
    userSelected,
    flowActionUser
  } = useUsers();
  const { action } = userAction;
  let disabled;
  if (action === "" || action === "update") disabled = false;
  else disabled = true;
  let userInfo = { name: "", email: "" };
  if (userSelected) {
    userInfo.name = userSelected.name;
    userInfo.email = userSelected.email;
  }

  const closeModal = () => {
    handleSelectUserAction(null, "", "");
    setUserSelected(null);
    resetUserInfo();
    toggleModal("");
  }

  return (
    <div className={style.modal}>
      <div className={style.modal__header}>
        <img src={ICON_LOGO} />
        <h3>{action === "" ? "Create" : action} Admin User</h3>
      </div>
      <div className={style.modal__inputs}>
        <Input
          type={"text"}
          label={"Name"}
          handleFunction={handleOnChangeUser}
          name={"name"}
          placeholder={"Name..."}
          disabled={disabled}
          value={userInfo.name}
        />
        <Input
          type={"email"}
          label={"Email"}
          handleFunction={handleOnChangeUser}
          name={"email"}
          placeholder={"Email..."}
          disabled={disabled}
          value={userInfo.email}
        />
        {
          action === "" ? (
            <Input
              type={"text"}
              label={"Password"}
              handleFunction={handleOnChangeUser}
              name={"password"}
              placeholder={"Password..."}
              disabled={disabled}
            />
          ) : null
        }
      </div>

      {
        action === "" ? (
          <div className={style.modal__option}>
            <button className={style.btnCancel} onClick={closeModal}>Cancel</button>
            <button className={style.btnAcept} onClick={flowAddUserAdmin}>Create</button>
          </div>
        ) : action === "view" ? (
          <div className={style.modal__option__close}>
            <button className={style.btnClose} onClick={closeModal}>Close</button>
          </div>
        ) : (
          <div className={style.modal__option}>
            <button className={style.btnCancel} onClick={closeModal}>Cancel</button>
            <button className={style.btnAcept} onClick={flowActionUser}>{action}</button>
          </div>
        )
      }


    </div>
  )
}

export default UserAdminModal