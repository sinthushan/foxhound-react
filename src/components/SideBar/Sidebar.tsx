import { Link } from "react-router-dom";
import logo from "../../assets/foxhound.png";
import "./sidebar.css";
const Sidebar = () => {
  return (
    <nav id="navbar">
      <div className="logo">
        <a href="/">
          <img src={logo} alt="foxhound logo" />
        </a>
      </div>
      <ul>
        <li>
          <Link to="/">
            <div className="sidebar-item">
              <i className="nf nf-md-view_dashboard"></i>Dashboard
            </div>
          </Link>
        </li>
        <li>
          <div className="sidebar-item">
            <i className="nf nf-cod-graph_line"></i>Stats
          </div>
        </li>
        <li>
          <Link to="/link">
            <div className="sidebar-item">
              <i className="nf nf-md-vector_link"></i>Link
              <br />
              Accounts
            </div>
          </Link>
        </li>
      </ul>
      <ul className="bottomlinks">
        <li>
          <div className="sidebar-item">
            <i className="nf nf-cod-settings_gear"></i>Settings
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
