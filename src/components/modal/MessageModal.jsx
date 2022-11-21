import SUCCESS from "/gifs/success.gif";
import ERROR from "/gifs/error.gif";
import { useModal } from "../../hooks";
import style from "./MessageModal.module.css";
const MessageModal = () => {
    const { messageModal, toggleModal } = useModal();
    const { type, message } = messageModal;
    let image;
    let styleMessage;
    if (type === "success") {
        image = SUCCESS;
        styleMessage = "closeSuccess";
    } else if (type === "error") {
        image = ERROR;
        styleMessage = "closeError";
    } else {
        image = SUCCESS;
        styleMessage = "closeSuccess";
    }
    return (
        <div className={style.modal}>
            <div className={style.modal__gif}>
                <img src={image} />
            </div>
            <p>{message}</p>
            <button className={style[styleMessage]} onClick={() => toggleModal("")}>Close</button>
        </div>
    )
}

export default MessageModal