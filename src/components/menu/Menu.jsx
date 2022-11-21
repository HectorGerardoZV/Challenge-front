
import { Link } from "react-router-dom";
import style from "./Menu.module.css";
const Menu = () => {
    return (

        <div className={style.menu}>
            <div className={style.menu__logo}>
                <img src="/icons/icon-logo.svg" />
            </div>

            <div className={style.menu__option}>
                <Link to={"/admin"}>Users</Link>
                <Link to={"/admin"}>Accounts</Link>
                <Link to={"/admin"}>Move User</Link>
                <Link to={"/admin"}>Transactions Log</Link>
                <button className={style.btnLogout}>
                    <p>Logout</p>
                    <img src="/icons/icon-logout.svg" />
                </button>
            </div>
        </div>
    )
}

export default Menu