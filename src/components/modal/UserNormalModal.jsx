//Components
import { Input, TextArea } from "../../components";
//Hooks
import { useUsers, useModal } from "../../hooks";
//Icons
import ICON_LOGO from "/icons/icon-logo.svg";
//Style
import style from "./UserNormalModal.module.css";
const UserNormalModal = () => {
    const { handleOnChangeUser, flowAddUserNormal } = useUsers();
    const { toggleModal } = useModal();
    return (
        <div className={style.modal}>
            <div className={style.modal__header}>
                <img src={ICON_LOGO} />
                <h3>Creating Normal User</h3>
            </div>
            <div className={style.inputs}>
                <div className={style.dobleInput}>
                    <Input
                        name={"name"}
                        type={"text"}
                        placeholder={"Name..."}
                        label={"Name"}
                        handleFunction={handleOnChangeUser}
                    />
                    <Input
                        name={"email"}
                        type={"email"}
                        placeholder={"Email..."}
                        label={"Email"}
                        handleFunction={handleOnChangeUser}
                    />
                </div>
                <div className={style.dobleInput}>
                    <Input
                        name={"englishLevel"}
                        type={"text"}
                        placeholder={"English Level..."}
                        label={"englishLevel"}
                        handleFunction={handleOnChangeUser}
                    />
                    <Input
                        name={"linkCV"}
                        type={"text"}
                        placeholder={"link CV..."}
                        label={"linkCV"}
                        handleFunction={handleOnChangeUser}
                    />

                </div>
                <Input
                    name={"password"}
                    type={"text"}
                    placeholder={"Password..."}
                    label={"Password"}
                    handleFunction={handleOnChangeUser}
                />
                <TextArea
                    name={"technicalKnowledge"}
                    label={"Technical knowledge"}
                    placeholder={"Technical knowledge..."}
                    handleFunction={handleOnChangeUser}
                    otherStyle={style.textAreaStyle}
                />
            </div>

            <div className={style.modal__option}>
                <button className={style.btnCancel} onClick={() => toggleModal("")}>Cancel</button>
                <button className={style.btnAcept} onClick={flowAddUserNormal}>Create</button>
            </div>
        </div>
    )
}

export default UserNormalModal