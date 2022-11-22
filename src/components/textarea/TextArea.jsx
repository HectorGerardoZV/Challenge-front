import PropTypes from "prop-types";
//Style
import style from "./TextArea.module.css";
const TextArea = (props) => {
    const {
        placeholder,
        handleFunction,
        name,
        label,
        otherStyle,
        disabled,
        value
    } = props;
    return <div className={style.textArea}>
        <label>{label}</label>
        <textarea
            onChange={handleFunction}
            name={name}
            placeholder={placeholder}
            className={`${otherStyle ? otherStyle : ""} ${disabled ? style.desibled : ""}`}
            disabled={disabled}
            defaultValue={value}
        >

        </textarea>
    </div>;
};
TextArea.propTypes = {
    placeholder: PropTypes.string,
    handleFunction: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any
}

export default TextArea;
