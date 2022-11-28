import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./AdminNormalPage.module.css";
const AdminNormalPage = () => {
    let navigate = useNavigate()
    const logout = () => {
        navigate("/");
    }
    return <div className={style.page}>
        <div className={style.menu}>
            <div className={style.menu__logo}>
                <img src="/icons/icon-logo.svg" />
            </div>

            <div className={style.menu__option}>
                <Link to={"/admin"}>My Account</Link>
                <button className={style.btnLogout}
                    onClick={logout}
                >
                    <p>Logout</p>
                    <img src="/icons/icon-logout.svg" />
                </button>
            </div>
        </div>
        <div className={style.userSection}>
            
        </div>
    </div>;
};

export default AdminNormalPage;
