import ICON_ADMIN_USER from "/icons/icon-user-admin.svg";
import ICON_NORMAL_USER from "/icons/icon-user-normal.svg";
import ICON_CLOSE_MODAL from "/icons/icon-close-modal.svg";

//Hooks
import { useModal } from "../../hooks";

//Style
import style from "./ModalOptionUser.module.css";
const ModalOptionUser = () => {
  const { toggleModal, changeModal } = useModal();
  return (
    <div className={style.modalSelectUser}>
      <button className={style.closeModal} onClick={() => toggleModal("")}>
        <img src={ICON_CLOSE_MODAL} />
      </button>
      <h2>Select a user type</h2>
      <div className={style.optionsModal}>
        <button onClick={() => changeModal("AddUserAdmin")}>
          <img src={ICON_ADMIN_USER} />
          <p>Administrator</p>
        </button>
        <button onClick={() => changeModal("AddUserNormal")}>
          <img src={ICON_NORMAL_USER} />
          <p>Normal</p>
        </button>
      </div>
    </div>
  )
}

export default ModalOptionUser