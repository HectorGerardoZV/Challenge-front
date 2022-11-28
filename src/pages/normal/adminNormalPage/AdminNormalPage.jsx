import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
//Components
//Hooks
import { useUsers } from "../../../hooks";
//Styles
import style from "./AdminNormalPage.module.css";
const AdminNormalPage = () => {
    let navigate = useNavigate()
    let { fetchUser, user } = useUsers();
    const logout = () => {
        navigate("/");
    }
    useEffect(() => {
        fetchUser();
    }, [])
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
            <h1 className={style.title}>Your Account <span>Information</span></h1>
            <div className={style.userInfo}>
                <div className={style.userInfo__inputD}>
                    <div className={style.userInfo__input}>
                        <label>Name</label>
                        <p>{user?.user?.name} </p>
                    </div>
                    <div className={style.userInfo__input}>
                        <label>Email</label>
                        <p>{user?.user?.email}</p>
                    </div>
                </div>

                <div className={style.userInfo__inputD}>
                    <div className={style.userInfo__input}>
                        <label>Engilsh Level</label>
                        <p>{user?.englishLevel} </p>
                    </div>
                    <div className={style.userInfo__input}>
                        <label>CV Link</label>
                        <a href={user?.linkCV} target={"_blank"}> {user?.linkCV}</a>
                    </div>
                </div>
                <div className={style.userInfo__textarea}>
                    <label>Technical knowledge</label>
                    <textarea disabled={true} value={user?.technicalKnowledge}>
                    </textarea>
                </div>
            </div>
        </div>
    </div>;
};

export default AdminNormalPage;
