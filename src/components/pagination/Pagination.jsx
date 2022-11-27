import PropTypes from "prop-types";

import style from "./Pagination.module.css";
const Pagination = (props) => {
    const { pages, action } = props;
    return (
        <div className={style.paginate}>
            <div>{
                pages.map((pageItem, i) =>
                    <button key={i}
                        onClick={() => action(pageItem)}
                    >
                        {pageItem}
                    </button>
                )
            }
            </div>
        </div>
    )
}
Pagination.propTypes = {
    pages: PropTypes.array,
    action: PropTypes.func
}

export default Pagination