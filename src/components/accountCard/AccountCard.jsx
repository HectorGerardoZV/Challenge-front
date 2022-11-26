
//Hooks
import { useAccounts } from "../../hooks";
//Style
import style from "./AccountCard.module.css";
const AccountCard = () => {
    const { account, accountSelected, handleOnChangeInput } = useAccounts();
    let accountInfo = { ...account }
    const { accountName, clientName, responsible, team } = accountInfo;
    const { action } = accountSelected;
    let disabled = false;
    if (action === "view") {
        disabled = true;
    }
    return (
        <div className={style.accountCard}>
            <div className={style.accountCard__input}>
                <label>Account Name</label>
                <input
                    name="accountName"
                    id="accountName"
                    placeholder="Account Name..."
                    defaultValue={accountName}
                    disabled={disabled}
                    className={disabled ? style.disabled : ""}
                    onChange={handleOnChangeInput}
                />
            </div>
            <div className={style.accountCard__input}>
                <label>Client Name</label>
                <input
                    name="clientName"
                    id="clientName"
                    placeholder="Client Name..."
                    defaultValue={clientName}
                    disabled={disabled}
                    className={disabled ? style.disabled : ""}
                    onChange={handleOnChangeInput}
                />
            </div>
            <div className={style.accountCard__input}>
                <label>Responsible</label>
                <input
                    name="responsible"
                    id="responsible"
                    placeholder="Responsible..."
                    defaultValue={responsible}
                    disabled={disabled}
                    className={disabled ? style.disabled : ""}
                    onChange={handleOnChangeInput}
                />
            </div>
            <div className={style.accountCard__team}>
                <label>Number of members</label>
                <p>{team?.members.length}</p>
            </div>

        </div>
    )
}

export default AccountCard