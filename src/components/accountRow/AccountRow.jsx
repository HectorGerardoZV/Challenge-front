
//Components
import { BtnAction } from "../../components";
//Hooks
import { useAccounts } from "../../hooks";
//Icons
import DELTE_ICON from "/icons/icon-delete.svg";
import UPDATE_ICON from "/icons/icon-update.svg";
import VIEW_ICON from "/icons/icon-view.svg";
//Style
import style from "./AccountRow.module.css";
const AccountRow = (props) => {
    const { handleSelectAccount } = useAccounts();

    const { idAccount, accountName, clientName, responsible } = props;
    return (
        <div className={style.accountInfo}>
            <p>{accountName}</p>
            <p>{clientName}</p>
            <p>{responsible}</p>
            <div className={style.accountActions}>
                <BtnAction image={DELTE_ICON}
                    action={() => handleSelectAccount(idAccount, accountName, "delete")} />
                <BtnAction image={VIEW_ICON}
                    action={() => handleSelectAccount(idAccount, accountName, "view")} />
                <BtnAction image={UPDATE_ICON}
                    action={() => handleSelectAccount(idAccount, accountName, "update")} />
            </div>
        </div>
    )
}

export default AccountRow;