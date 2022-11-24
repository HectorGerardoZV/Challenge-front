import { Outlet } from "react-router-dom";
//Components
import {
    Menu,
    Modal,
    UserAdminModal,
    ModalOptionUser,
    UserNormalModal,
    MessageModal,
    ModalAdminAccount,
    ModalOptionAccount
} from "../../../components";
//Hooks
import { useModal } from "../../../hooks";
//Style
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import style from "./AdminMasterPage.module.css";
const AdminMasterPage = () => {
    const { modal, modalType } = useModal();
    const modalSelcted = {
        UserAdmin: <UserAdminModal />,
        UserNormal: <UserNormalModal />,
        OptionUser: <ModalOptionUser />,
        Message: <MessageModal />,
        AccountAdmin: <ModalAdminAccount />,
        OptionAccount: <ModalOptionAccount />
    }

    return (
        <div className={style.layout}>
            <section className={style.masterLayout}>
                <Menu />
                <Outlet />
            </section>
            {
                modal ? (
                    <Modal >
                        {modalSelcted[modalType]}
                    </Modal>
                ) : null
            }
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default AdminMasterPage;
