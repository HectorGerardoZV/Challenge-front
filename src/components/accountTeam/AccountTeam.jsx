//Components
import { Spin } from "../../components";
//Hooks
import { useAccounts, useTeams } from "../../hooks";
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