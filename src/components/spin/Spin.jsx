import React from 'react'

import style from "./Spin.module.css";
const Spin = () => {
    return (
        <div className={style.spinner}>
            <div className={`${style.double_bounce1}`}></div>
            <div className={`${style.double_bounce2}`}></div>
        </div>
    )
}

export default Spin