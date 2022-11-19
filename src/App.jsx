//Router
import AppRouter from "./routes/AppRouter";
//Providers
import { values } from "./context";
const { AuthProvider } = values.providers;
const App = () => {
    return (
        <>
            <AuthProvider>
                <AppRouter />;
            </AuthProvider>
        </>
    );
};

export default App;
