import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import { Login, AdminMasterPage, UserAdminPage, AdminNormalPage } from "../pages";
import { useAuth } from "../hooks";

const AppRouter = () => {
    const { userRole } = useAuth();
    const role1 = import.meta.env.VITE_ROLE1;
    const role2 = import.meta.env.VITE_ROLE2;
    const role3 = import.meta.env.VITE_ROLE3;
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />

                    {userRole === role1 || userRole === role2 ? (
                        <Route path="/admin" element={<AdminMasterPage />}>
                            <Route index element={<UserAdminPage />} />
                        </Route>
                    ) : userRole === role3 ? (
                        <Route path="/admin" element={<AdminNormalPage />} />
                    ) : null}
                </Routes>
            </Router>
        </>
    );
};

export default AppRouter;