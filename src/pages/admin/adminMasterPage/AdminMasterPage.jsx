import { Outlet } from "react-router-dom";
//Components
import {Menu} from "../../../components";
//Style
import style from "./AdminMasterPage.module.css";
const AdminMasterPage = () => {
    return (
        <section className={style.masterLayout}>
            <Menu/>
            <Outlet />
        </section>
    );
};

export default AdminMasterPage;
