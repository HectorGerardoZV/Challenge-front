
import style from "./Modal.module.css";
const Modal = ({children}) => {
  return (
    <div className={style.modal}>
        {children}
    </div>
  )
}

export default Modal;