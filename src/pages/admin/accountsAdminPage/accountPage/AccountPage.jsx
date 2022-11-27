import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
//Accounts
import { AccountCard, AccountTeam, Spin } from "../../../../components";
//Hooks
import { useAccounts } from "../../../../hooks";
//Icons
import ICON_BACK from "/icons/icon-back.svg";
//Style
import style from "./AccountPage.module.css";
const AccountPage = () => {
    const { handleResetAccount, accountSelected, loadingAccount, loadPage, updateAccountFlow } = useAccounts();
    const { action } = accountSelected;
    const param = useParams();

    useEffect(() => {
        if (param?.id) loadPage(param.id)
    }, []);

    return (
        <div className={style.accountPage}>
            <div className={style.accountPage__header}>
                <Link to={"/admin/accounts"} onClick={handleResetAccount}>
                    <img src={ICON_BACK} />
                    <p>Back</p>
                </Link>
                <h2>{action} the <span>account</span> information</h2>
            </div>
            <section className={style.accountPage__layout}>

                <div className={style.accountPage__section}>
                    <h3 className={style.section__title}>Account <span>information</span></h3>
                    {loadingAccount ? (<Spin />) : (<AccountCard />)}

                </div>
                <div className={style.accountPage__section}>
                    <h3 className={style.section__title}>Account <span>team</span></h3>
                    <AccountTeam />
                    {
                        action === "update" ? (
                            <div className={style.options}>
                                <button className={style.buttonCancel}>Cancel Changes</button>
                                <button className={style.buttonAcept} onClick={updateAccountFlow}>Save Changes</button>
                            </div>
                        ) : null
                    }
                </div>
            </section>

        </div>
    )
}

export default AccountPage