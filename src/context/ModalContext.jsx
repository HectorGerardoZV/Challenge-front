import { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProdiver = ({ children }) => {
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [messageModal, setMessageModal] = useState({
        type: "",
        message: ""
    })

    const toggleModal = (type) => {
        setModal(!modal);
        setModalType(type);
    };
    const changeModal = (modalType) => {
        setModalType(modalType);
    }

    return (
        <ModalContext.Provider
            value={{
                modal,
                modalType,
                toggleModal,
                changeModal,
                setMessageModal,
                messageModal
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
export { ModalProdiver };
export default ModalContext;
