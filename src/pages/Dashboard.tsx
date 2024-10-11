import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/SideBar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import "./dashboard.css";
import { useContext } from "react";
import { UserContext } from "../services/user";
import auth from "../services/auth";

const Dashboard = () => {
  const { setUser } = useContext(UserContext);
  const location = useLocation();
  const path = location.pathname;
  const logoutUser = () => {
    auth.logout();
    setUser(null);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Topbar logoutUser={logoutUser} path={path} />
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
