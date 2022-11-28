import { useContext } from "react"
import { values } from "../context";

const useTeams = () => {
    return useContext(values.context.TeamsContex);
}

export default useTeams