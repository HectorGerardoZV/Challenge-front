

import style from "./TableRow.module.css";
const TableRow = (props) => {
    const { values } = props;
    let actions = props.hasOwnProperty("actions") ? props.actions : null;
    return (
        <tr>
            {
                values.map((value, index) => (
                    <td key={index}>{value}</td>
                ))
            }
            {
                actions?()
            }
        </tr>
    )
}

export default TableRow