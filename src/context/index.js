import AuthContext, { AuthProvider } from "./AuthContext";
import UsersContext, { UsersProvider } from "./UsersContext";
import ModalContext, { ModalProdiver } from "./ModalContext";
const values = {
    context: {
        AuthContext,
        UsersContext,
        ModalContext
    },
    providers: {
        AuthProvider,
        UsersProvider,
        ModalProdiver
    },
};

export { values };
