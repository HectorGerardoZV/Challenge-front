import { Outlet } from "react-router-dom";

//Style
import style from "./AdminMasterPage.module.css";
const AdminMasterPage = () => {
    return (
        <section>
            <h1>MainPage</h1>
            <Outlet />
        </section>
    );
};

export default AdminMasterPage;
