//Hooks
import { useAccounts, useModal } from "../../../hooks";
import ICON_LOGO from "/icons/icon-logo.svg";

//Style
import style from "./ModalOptionAccount.module.css";
const ModalOptionAccount = () => {
    const { deleteAccountFlow, accountSelected } = useAccounts();
    const { accountName, idAccount } = accountSelected;
    const { toggleModal } = useModal();
    return (
        <div className={style.modal}>
            <div className={style.modal__header}>
                <img src={ICON_LOGO} />
                <h3>Deleting Account</h3>
            </div>
            <p>
                Are you sure to delete the account
                "{accountName}" with the responsible "responsible"?
            </p>
            <div className={style.modalOptions}>
                <button className={style.optionCancel} onClick={() => toggleModal("")}>Cancel</button>
                <button className={style.optionAcept} onClick={() => deleteAccountFlow(idAccount)}>Yes</button>
            </div>
        </div>
    )
}

export default ModalOptionAccount