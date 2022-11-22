//Components
import { Input, TextArea } from "../../components";
//Hooks
import { useUsers, useModal } from "../../hooks";
//Icons
import ICON_LOGO from "/icons/icon-logo.svg";
//Style
import style from "./UserNormalModal.module.css";
const UserNormalModal = () => {
    const {
        handleOnChangeUser,
        flowAddUserNormal,
        userSelected,
        setUserSelected,
        handleSelectUserAction,
        userAction,
        resetUserInfo,
        flowActionUser
    } = useUsers();
    const { action } = userAction;
    let userValues = userSelected ? userSelected : {
        name: "",
        email: "",
        password: "",
        englishLevel: "",
        technicalKnowledge: "",
        linkCV: "",
        role: "",
        user: { name: "", email: "" },

    }
    const { user, englishLevel, linkCV, technicalKnowledge } = userValues;
    const { name, email, } = user;
    let disabled;
    if (action === "" || action === "update") disabled = false;
    else disabled = true;
    const { toggleModal } = useModal();
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
                <h3>{action === "update" ?
                    "Updating Normal User" :
                    action === "delete" ?
                        "Deleting Normal User" :
                        action === "view" ?
                            "Viewing Normal User" :
                            "Creating Normal User"
                }</h3>
            </div>
            <div className={style.inputs_layout}>
                <div className={style.inputs}>
                    <Input
                        name={"name"}
                        type={"text"}
                        placeholder={"Name..."}
                        label={"Name"}
                        handleFunction={handleOnChangeUser}
                        disabled={disabled}
                        value={name}
                    />
                    <Input
                        name={"email"}
                        type={"email"}
                        placeholder={"Email..."}
                        label={"Email"}
                        handleFunction={handleOnChangeUser}
                        disabled={disabled}
                        value={email}
                    />
                    <Input
                        name={"englishLevel"}
                        type={"text"}
                        placeholder={"English Level..."}
                        label={"englishLevel"}
                        handleFunction={handleOnChangeUser}
                        disabled={disabled}
                        value={englishLevel}
                    />
                    <Input
                        name={"linkCV"}
                        type={"text"}
                        placeholder={"link CV..."}
                        label={"linkCV"}
                        handleFunction={handleOnChangeUser}
                        disabled={disabled}
                        value={linkCV}
                    />

                    {
                        action === "" ? (
                            <Input
                                name={"password"}
                                type={"text"}
                                placeholder={"Password..."}
                                label={"Password"}
                                handleFunction={handleOnChangeUser}
                                disabled={false}
                            />
                        ) : null
                    }
                </div>

                <TextArea
                    name={"technicalKnowledge"}
                    label={"Technical knowledge"}
                    placeholder={"Technical knowledge..."}
                    handleFunction={handleOnChangeUser}
                    otherStyle={style.textAreaStyle}
                    disabled={disabled}
                    value={technicalKnowledge}
                />
            </div>
            <div>

            </div>
            {
                action === "" ? (
                    <div className={style.modal__option}>
                        <button className={style.btnCancel} onClick={closeModal}>Cancel</button>
                        <button className={style.btnAcept} onClick={flowAddUserNormal}>Create</button>
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

export default UserNormalModal