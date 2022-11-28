import AuthContext, { AuthProvider } from "./AuthContext";
import UsersContext, { UsersProvider } from "./UsersContext";
import ModalContext, { ModalProdiver } from "./ModalContext";
import AccountsContext, { AccountsProdiver } from "./AccountsContext";
import TeamsContex, { TeamsProvider } from "./TeamsContex";
import TransactionsContext, { TransactionsProvider } from "./TransactionsContext";

const values = {
    context: {
        AuthContext,
        UsersContext,
        ModalContext,
        AccountsContext,
        TeamsContex,
        TransactionsContext
    },
    providers: {
        AuthProvider,
        UsersProvider,
        ModalProdiver,
        AccountsProdiver,
        TeamsProvider,
        TransactionsProvider
    },
};

export { values };
