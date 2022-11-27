//Components
import { Input } from "../../index";
//Hooks
import { useModal, useAccounts } from "../../../hooks";
//Icons
import ICON_LOGO from "/icons/icon-logo.svg";
//Style
import style from "./ModalAdminAccount.module.css";
const ModalAdminAccount = () => {

    const { toggleModal } = useModal();
    const { handleOnChangeInput, accountInfo, handleResetAccountInfo, addNewAccout } = useAccounts();
    const { accountName, clientName, responsible } = accountInfo;

    const closeModal = () => {
        toggleModal("");
        handleResetAccountInfo();
    }
    return (
        <div className={style.modal}>
            <div className={style.modal__header}>
                <img src={ICON_LOGO} />
                <h3>Creating Account</h3>
            </div>
            <div className={style.inputs}>
                <div className={style.inputs__double}>
                    <Input
                        label={"Account Name"}
                        placeholder={"Account Name..."}
                        name={"accountName"}
                        type={"text"}
                        value={accountName}
                        handleFunction={handleOnChangeInput}
                        disabled={false}
                    />
                    <Input
                        label={"Client Name"}
                        placeholder={"Client Name..."}
                        name={"clientName"}
                        type={"text"}
                        value={clientName}
                        handleFunction={handleOnChangeInput}
                        disabled={false}
                    />
                </div>
                <Input
                    label={"Responsible"}
                    placeholder={"Responsible..."}
                    name={"responsible"}
                    type={"text"}
                    value={responsible}
                    handleFunction={handleOnChangeInput}
                    disabled={false}
                />

            </div>
            <div className={style.options}>
                <button className={style.optionCancel} onClick={closeModal}>Cancel</button>
                <button className={style.optionAcept} onClick={addNewAccout}>Create</button>
            </div>

        </div>
    )
}

export default ModalAdminAccount