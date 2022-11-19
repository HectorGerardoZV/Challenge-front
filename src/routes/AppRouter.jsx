import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import { Login, AdminMasterPage, UserAdminPage } from "../pages";

const AppRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/admin" element={<AdminMasterPage />}>
                        <Route index element={<UserAdminPage />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
};

export default AppRouter;
