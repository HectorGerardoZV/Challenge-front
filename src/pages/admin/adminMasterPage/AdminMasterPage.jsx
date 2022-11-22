import { Outlet } from "react-router-dom";
//Components
import {
    Menu,
    Modal,
    UserAdminModal,
    ModalOptionUser,
    UserNormalModal,
    MessageModal
} from "../../../components";
//Hooks
import { useModal } from "../../../hooks";
//Style
import style from "./AdminMasterPage.module.css";
const AdminMasterPage = () => {
    const { modal, modalType } = useModal();
    const modalSelcted = {
        UserAdmin: <UserAdminModal />,
        UserNormal: <UserNormalModal />,
        OptionUser: <ModalOptionUser />,
        Message: <MessageModal />
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
        </div>
    );
};

export default AdminMasterPage;
