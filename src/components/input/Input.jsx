import style from "./Input.module.css";
const Input = (props) => {
    const { type, placeholder, handleFunction, name, label } = props;
    return (
        <>
            <div className={style.input}>
                <label htmlFor={name}>{label}</label>
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={handleFunction}
                />
            </div>
        </>
    );
};

export default Input;
