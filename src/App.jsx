//Router
import AppRouter from "./routes/AppRouter";
//Providers
import { values } from "./context";
const {
    AuthProvider,
    UsersProvider,
    ModalProdiver,
    AccountsProdiver,
    TeamsProvider
} = values.providers;
const App = () => {
    return (
        <>
            <AuthProvider>
                <ModalProdiver>
                    <UsersProvider>
                        <AccountsProdiver>
                            <TeamsProvider>
                                <AppRouter />;
                            </TeamsProvider>
                        </AccountsProdiver>
                    </UsersProvider>
                </ModalProdiver>
            </AuthProvider>
        </>
    );
};

export default App;
