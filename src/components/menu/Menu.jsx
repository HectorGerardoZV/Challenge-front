import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./Menu.module.css";
const Menu = () => {
    let navigate = useNavigate()
    const logout = () => {
        navigate("/");
    }
    return (
        <div className={style.menu}>
            <div className={style.menu__logo}>
                <img src="/icons/icon-logo.svg" />
            </div>

            <div className={style.menu__option}>
                <Link to={"/admin"}>Users</Link>
                <Link to={"/admin/accounts"}>Accounts</Link>
                <Link to={"/admin/transactions"}>Transactions Log</Link>
                <button className={style.btnLogout}
                    onClick={logout}
                >
                    <p>Logout</p>
                    <img src="/icons/icon-logout.svg" />
                </button>
            </div>
        </div>
    )
}

export default Menu