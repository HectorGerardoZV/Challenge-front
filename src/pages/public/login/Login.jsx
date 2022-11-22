import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//Components
import { Input } from "../../../components";

//Hooks
import { useAuth } from "../../../hooks";

//Images
import LOGO from "/icons/icon-logo.svg";
import LOGO_WHITE from "/icons/icon-logo-white.svg";

//Style
import style from "./Login.module.css";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const { loginFlow, handleOnChangeInputLogin } = useAuth();
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const access = await loginFlow();
        if (access) {
            setTimeout(() => {
                navigate("/admin");
            }, 3000);
        }
    };

    return (
        <>
            <main className={style.login}>
                <section className={style.form_layout}>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <div className={style.form_image}>
                            <img src={LOGO} alt="ArkusNexus Logo" />
                        </div>
                        <Input
                            type={"text"}
                            placeholder={"Your email..."}
                            name={"email"}
                            label={"Email"}
                            handleFunction={handleOnChangeInputLogin}
                        />
                        <Input
                            type={"password"}
                            placeholder={"Your password..."}
                            name={"password"}
                            label={"Password"}
                            handleFunction={handleOnChangeInputLogin}
                        />
                        <button className={style.form_submit}>
                            <div>
                                <p>Login</p>
                                <img src={LOGO_WHITE} alt="" />
                            </div>
                        </button>
                    </form>
                </section>
                <section className={style.presentation}>
                    <p>
                        High-skilled talent <br /> to boost your <br /> <span>company's goals</span>
                    </p>
                </section>
            </main>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </>
    );
};

export default Login;
