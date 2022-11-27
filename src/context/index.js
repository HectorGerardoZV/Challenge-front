import AuthContext, { AuthProvider } from "./AuthContext";
import UsersContext, { UsersProvider } from "./UsersContext";
import ModalContext, { ModalProdiver } from "./ModalContext";
import AccountsContext, { AccountsProdiver } from "./AccountsContext";

const values = {
    context: {
        AuthContext,
        UsersContext,
        ModalContext,
        AccountsContext
    },
    providers: {
        AuthProvider,
        UsersProvider,
        ModalProdiver,
        AccountsProdiver
    },
};

export { values };
