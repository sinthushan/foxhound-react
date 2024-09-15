import { Outlet } from "react-router-dom"
import Sidebar from "../components/SideBar/Sidebar"
import Topbar from "../components/Topbar/Topbar"
import "./dashboard.css"
import { useContext, useEffect } from "react"
import { checkifloggedIn, UserContext } from "../services/user"
import auth from "../services/auth"

const Dashboard = () =>{
  const {setUser} = useContext(UserContext)    
    
  const logoutUser = () => {
    auth.logout()
    setUser(null)
  }  
  
  return (
        <div className="dashboard">
          <Sidebar/>
          <main>
            <Topbar  logoutUser={logoutUser}/>
            <Outlet/>
          </main>
        </div>
    )
}

export default Dashboard