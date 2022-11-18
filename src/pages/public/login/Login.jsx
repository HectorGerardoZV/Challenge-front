//Components
import { Input } from "../../../components";

//Images
import LOGO from "/icons/icon-logo.svg";
import LOGO_WHITE from "/icons/icon-logo-white.svg";

//Style
import style from "./Login.module.css";
const Login = () => {
    const getInfo = (e) => {
        console.log(e.target.value);
    };
    return (
        <main className={style.login}>
            <section className={style.form_layout}>
                <form className={style.form}>
                    <div className={style.form_image}>
                        <img src={LOGO} alt="ArkusNexus Logo" />
                    </div>
                    <Input
                        type={"text"}
                        placeholder={"Your email..."}
                        name={"email"}
                        label={"Email"}
                        handleFunction={getInfo}
                    />
                    <Input
                        type={"password"}
                        placeholder={"Your password..."}
                        name={"password"}
                        label={"Password"}
                        handleFunction={getInfo}
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
    );
};

export default Login;
