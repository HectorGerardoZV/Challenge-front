import { useEffect } from "react";
//Components
import { Input } from "../../../components";
//Hooks
import { useTransactions } from "../../../hooks";
//Icons
import ICON_ARROW from "/icons/icon-to.svg";
//Style
import style from "./TransactionLogPage.module.css";
const TransactionLogPage = () => {

    const {
        handleFilterTransactions,
        loadPage,
        filterTransactions,
        transactionsManipulate
    } = useTransactions();

    const onKeyEnter = (e) => {
        if (e.key === "Enter") filterTransactions();
    }
    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div className={style.page}>
            <h1 className={style.title}>Transaction <span>Log</span></h1>
            <div className={style.filters}>
                <div className={style.input}>
                    <label>Name</label>
                    <input
                        placeholder={"Name..."}
                        name={"name"}
                        type={"text"}
                        onChange={handleFilterTransactions}
                        onKeyDown={onKeyEnter}
                    />
                </div>
                <div className={style.input}>
                    <label>Account</label>
                    <input
                        placeholder={"Account..."}
                        name={"account"}
                        type={"text"}
                        onChange={handleFilterTransactions}
                        onKeyDown={onKeyEnter}
                    />
                </div>
                <div className={style.input}>
                    <label>Start Date</label>
                    <input
                        name={"startDate"}
                        type={"date"}
                        onChange={handleFilterTransactions}
                        onKeyDown={onKeyEnter}
                    />
                </div>
                <div className={style.input}>
                    <label>Start Date</label>
                    <input
                        name={"endDate"}
                        type={"date"}
                        onChange={handleFilterTransactions}
                        onKeyDown={onKeyEnter}
                    />
                </div>

                <div className={style.buttonFilter}>
                    <button
                        onClick={filterTransactions}
                    >
                        Filter
                    </button>
                </div>

            </div>
            <div className={style.transaction__header}>
                <p>User</p>
                <p>From</p>
                <p></p>
                <p>To</p>
                <p>Start Date</p>
                <p>End Date</p>
            </div>
            <div className={style.transactions}>
                {
                    transactionsManipulate.map((transaction, index) => {
                        const { user, to, from, startDate, endDate } = transaction;
                        const start = endDate ? new Date(startDate).toLocaleString().split(",")[0] : "---";
                        const end = endDate ? new Date(endDate).toLocaleString().split(",")[0] : "---";
                        return (
                            <div key={index} className={style.transactionsRow}>
                                <p>{user?.name ? user.name : "----"}</p>
                                <p>{from?.accountName ? from.accountName : "----"}</p>
                                <div>
                                    <img src={ICON_ARROW} />
                                </div>
                                <p>{to?.accountName ? to.accountName : "----"}</p>
                                <p>{start}</p>
                                <p>{end}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TransactionLogPage