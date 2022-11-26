//Components
import { Spin, BtnAction } from "../../components";
//Hooks
import { useAccounts } from "../../hooks";
//Icons
import DELTE_ICON from "/icons/icon-delete.svg";
import VIEW_ICON from "/icons/icon-view.svg";
//Style
import style from "./AccountTeam.module.css";
const AccountTeam = () => {
    const { account, accountSelected, loadingAccount } = useAccounts();

    let accountInfo = { ...account }
    const { team } = accountInfo;

    return (
        <div className={style.accountTeam}>
            <div className={style.accountTeam__header}>
                <p>Username</p>
                <p>Email</p>
                <p>Role</p>
                <p>Actions</p>
            </div>
            <div className={style.accountTeam__body}>
                {loadingAccount ? (<Spin />) :
                    <>
                        {
                            team?.members.map((user, index) => {
                                const { username, email } = user;
                                return (
                                    <div className={style.userTeam}
                                        key={index}
                                    >
                                        <p>{username}</p>
                                        <p>{email}</p>
                                        <div className={style.userTeam__actions}>
                                            <BtnAction
                                                action={() => { }}
                                                image={DELTE_ICON}
                                            />
                                            <BtnAction
                                                action={() => { }}
                                                image={VIEW_ICON}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                }

            </div>
        </div>
    )
}

export default AccountTeam