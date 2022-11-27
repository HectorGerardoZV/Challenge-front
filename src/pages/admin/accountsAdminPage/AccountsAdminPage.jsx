import { useEffect } from "react";
//Components
import { AccountRow } from "../../../components";
//Hooks
import { useAccounts, useModal } from "../../../hooks";
//Icon
import ICON_SEACH from "/icons/icon-search.svg";
import ICON_PLUS from "/icons/icon-plus.svg";
//Style
import style from "./AccountsAdminPage.module.css";
const AccountsAdminPage = () => {
    const {
        loadPageAccounts,
        accountsManipulate,
    } = useAccounts();
    const { toggleModal } = useModal();

    useEffect(() => {
        loadPageAccounts();
    }, []);
    return (
        <section className={style.page}>
            <div className={style.page__header}>
                <div className={style.searchSection}>
                    <input placeholder="Account..." onChange={() => { }} />
                    <img src={ICON_SEACH} onClick={() => { }} />
                </div>
                <button className={style.btnAdd} onClick={() => toggleModal("AccountAdmin")}>
                    <img src={ICON_PLUS} />
                </button>
            </div>

            <section className={style.tableUsers}>
                <div className={style.tableLayout}>
                    <div className={style.headTable}>
                        <p>Account</p>
                        <p>Client</p>
                        <p>Responsible</p>
                        <p>Actions</p>
                    </div>
                    <div className={style.tableBody}>
                        {
                            accountsManipulate.map((account, i) => (
                                <AccountRow
                                    key={i}
                                    idAccount={account._id}
                                    accountName={account.accountName}
                                    clientName={account.clientName}
                                    responsible={account.responsible}
                                />
                            )
                            )
                        }
                    </div>
                </div>
            </section>
        </section>
    )
}

export default AccountsAdminPage;