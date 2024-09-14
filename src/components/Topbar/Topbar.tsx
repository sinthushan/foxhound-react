import { useContext } from "react"
import "./topbar.css"
import { UserContext } from "../../services/user"

const Topbar = () => {
    const {user} = useContext(UserContext)
    return (
        <nav id="topbar">
            <h1>{user?.username}'s Dashboard</h1>
            <div className="rightWidgets">
                <input type="text" placeholder="Search"/>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960">
                    <path d="M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360t-111 13.5T260-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T560-640t-23.5-56.5T480-720t-56.5 23.5T400-640t23.5 56.5T480-560m0 320"/>
                </svg>
            </div>
        </nav>
    )
}

export default Topbar