import { useState, useEffect, createContext } from "react"

const TeamsContex = createContext();
const TeamsProvider = ({ children }) => {
    const [teamValues, setTeamValues]= useState({
        team:null,
        teamSelected:null,
        userSelected:null,
        teamAction:""
    });


    return (
        <TeamsContex.Provider
            value={{
                ...teamValues
            }}
        >
            {children}
        </TeamsContex.Provider>
    )
}
export {TeamsProvider}
export default TeamsContex