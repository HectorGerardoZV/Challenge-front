import AuthContext, { AuthProvider } from "./AuthContext";
import UsersContext, { UsersProvider } from "./UsersContext";
const values = {
    context: {
        AuthContext,
        UsersContext
    },
    providers: {
        AuthProvider,
        UsersProvider
    },
};

export { values };
