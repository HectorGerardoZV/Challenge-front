import ERROR from "/gifs/error.gif";
import { useModal } from "../../../hooks";
import style from "./MessageModal.module.css";
const MessageModal = () => {
    const { messageModal, toggleModal } = useModal();
    const { type, message } = messageModal;
    let styleMessage;
    if (type === "success") {
        styleMessage = "closeSuccess";
    } else if (type === "error") {
        styleMessage = "closeError";
    } else {
        styleMessage = "closeSuccess";
    }
    return (
        <div className={style.modal}>
            <div className={style.modal__gif}>
                <iframe src="https://embed.lottiefiles.com/animation/96673"></iframe>
            </div>
            <p>{message}</p>
            <button className={style[styleMessage]} onClick={() => toggleModal("")}>Close</button>
        </div>
    )
}

export default MessageModal