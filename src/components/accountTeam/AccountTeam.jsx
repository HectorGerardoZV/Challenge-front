//Components
import { Spin, BtnAction } from "../../components";
//Hooks
import { useAccounts, useTeams } from "../../hooks";
//Icons
import DELTE_ICON from "/icons/icon-delete.svg";
import VIEW_ICON from "/icons/icon-view.svg";
//Style
import style from "./AccountTeam.module.css";
const AccountTeam = () => {
    const { loadingAccount } = useAccounts();
    const { team } = useTeams();
    return (
        <div className={style.accountTeam}>
            <div className={style.accountTeam__header}>
                <p>Username</p>
                <p>Email</p>
                <p>Actions</p>
            </div>
            <div className={style.accountTeam__body}>
                {loadingAccount ? (<Spin />) :
                    <>
                        {
                            team?.members.map((user, index) => {
                                const { name, email } = user;
                                return (
                                    <div className={style.userTeam}
                                        key={index}
                                    >
                                        <p>{name}</p>
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