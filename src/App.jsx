//Router
import AppRouter from "./routes/AppRouter";
//Providers
import { values } from "./context";
const { AuthProvider, UsersProvider } = values.providers;
const App = () => {
    return (
        <>
            <AuthProvider>
                <UsersProvider>
                    <AppRouter />;
                </UsersProvider>
            </AuthProvider>
        </>
    );
};

export default App;
