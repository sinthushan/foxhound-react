import { Outlet } from "react-router-dom"
import Sidebar from "../components/SideBar/Sidebar"
import Topbar from "../components/Topbar/Topbar"
import "./dashboard.css"

const Dashboard = () =>{
    return (
        <div className="dashboard">
          <Sidebar/>
          <main>
            <Topbar/>
            <Outlet/>
          </main>
        </div>
    )
}

export default Dashboard