import { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProdiver = ({ children }) => {
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState("");
    
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
                changeModal
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
export { ModalProdiver };
export default ModalContext;
