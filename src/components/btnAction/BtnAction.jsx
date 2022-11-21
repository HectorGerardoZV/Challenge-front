import PropTypes from "prop-types";

import style from "./BtnAction.module.css";
const BtnAction = (props) => {
    const { image, action } = props;
    return (
        <button
            onClick={action}
        >
            <img src={image} />
        </button>
    )
}
BtnAction.propTypes = {
    image: PropTypes.string,
    action: PropTypes.func
}
export default BtnAction