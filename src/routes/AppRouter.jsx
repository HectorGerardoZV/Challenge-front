import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import { Login } from "../pages";

const AppRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>
        </>
    );
};

export default AppRouter;
