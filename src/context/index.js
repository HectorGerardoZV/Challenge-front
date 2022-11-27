import AuthContext, { AuthProvider } from "./AuthContext";
import UsersContext, { UsersProvider } from "./UsersContext";
import ModalContext, { ModalProdiver } from "./ModalContext";
import AccountsContext, { AccountsProdiver } from "./AccountsContext";
import TeamsContex,{TeamsProvider} from "./TeamsContex";

const values = {
    context: {
        AuthContext,
        UsersContext,
        ModalContext,
        AccountsContext,
        TeamsContex
    },
    providers: {
        AuthProvider,
        UsersProvider,
        ModalProdiver,
        AccountsProdiver,
        TeamsProvider
    },
};

export { values };
