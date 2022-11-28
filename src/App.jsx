//Router
import AppRouter from "./routes/AppRouter";
//Providers
import { values } from "./context";
const {
    AuthProvider,
    UsersProvider,
    ModalProdiver,
    AccountsProdiver,
    TeamsProvider,
    TransactionsProvider
} = values.providers;
const App = () => {
    return (
        <>
            <AuthProvider>
                <ModalProdiver>
                    <UsersProvider>
                        <AccountsProdiver>
                            <TeamsProvider>
                                <TransactionsProvider>
                                    <AppRouter />;
                                </TransactionsProvider>
                            </TeamsProvider>
                        </AccountsProdiver>
                    </UsersProvider>
                </ModalProdiver>
            </AuthProvider>
        </>
    );
};

export default App;
