//Router
import AppRouter from "./routes/AppRouter";
//Providers
import { values } from "./context";
const { AuthProvider, UsersProvider, ModalProdiver } = values.providers;
const App = () => {
    return (
        <>
            <AuthProvider>
                <ModalProdiver>
                    <UsersProvider>
                        <AppRouter />;
                    </UsersProvider>
                </ModalProdiver>
            </AuthProvider>
        </>
    );
};

export default App;
