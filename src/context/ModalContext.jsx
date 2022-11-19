import { createContext, useState } from "react";

const ModalContext = createContext();
const ModalProdiver = ({ children }) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <ModalContext.Provider
            value={{
                toggleModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
export { ModalProdiver };
export default ModalContext;
