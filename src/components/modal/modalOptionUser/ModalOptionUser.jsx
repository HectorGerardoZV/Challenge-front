import ICON_ADMIN_USER from "/icons/icon-user-admin.svg";
import ICON_NORMAL_USER from "/icons/icon-user-normal.svg";
import ICON_CLOSE_MODAL from "/icons/icon-close-modal.svg";

//Hooks
import { useModal, useAuth } from "../../../hooks";

//Style
import style from "./ModalOptionUser.module.css";
const ModalOptionUser = () => {
  const { toggleModal, changeModal } = useModal();
  const { userRole } = useAuth();
  return (
    <div className={style.modalSelectUser}>
      <button className={style.closeModal} onClick={() => toggleModal("")}>
        <img src={ICON_CLOSE_MODAL} />
      </button>
      <h2>Select a user type</h2>
      <div className={style.optionsModal}>
        {
          userRole === "SuperAdmin" ? (
            <button onClick={() => changeModal("UserAdmin")}>
              <img src={ICON_ADMIN_USER} />
              <p>Administrator</p>
            </button>
          ) : null
        }
        <button onClick={() => changeModal("UserNormal")}>
          <img src={ICON_NORMAL_USER} />
          <p>Normal</p>
        </button>
      </div>
    </div>
  )
}

export default ModalOptionUser