import { useContext } from "react";
import { values } from "../context";
const useModal = () => {
    return useContext(values.context.ModalContext);
}

export default useModal