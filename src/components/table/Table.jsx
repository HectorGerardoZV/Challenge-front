import PropTypes from "prop-types";
import style from "./Table.module.css";
const Table = (props) => {
    const { infoRow, actions } = props;

    console.log(infoRow);
    return (
        <div>
            {
                infoRow.map((info, i) => (
                    <p key={i}>{info}</p>
                ))
            }
           

        </div>
    )
}
Table.propTypes = {
    infoRow: PropTypes.array,
    actions: PropTypes.array
}

export default Table