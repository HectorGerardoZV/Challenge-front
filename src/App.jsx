//Router
import AppRouter from "./routes/AppRouter";
//Providers
import { values } from "./context";
const { AuthProvider, UsersProvider, ModalProdiver, AccountsProdiver } = values.providers;
const App = () => {
    return (
        <>
            <AuthProvider>
                <ModalProdiver>
                    <UsersProvider>
                        <AccountsProdiver>
                            <AppRouter />;
                        </AccountsProdiver>
                    </UsersProvider>
                </ModalProdiver>
            </AuthProvider>
        </>
    );
};

export default App;
