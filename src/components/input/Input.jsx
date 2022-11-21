import PropTypes from "prop-types";
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
Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    handleFunction: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string
}

export default Input;
