import logo from '../../assets/foxhound.png'
import "./sidebar.css"
const Sidebar =  () => {
    return (
        <nav id="navbar">
            <div className="logo">
                <a href="/"><img src={logo} alt="foxhound logo"/></a> 
                <h1>FoxHound</h1>
            </div>
            <ul>
                <li><div className="sidebar-item"><i className="nf nf-md-view_dashboard"></i>Dashboard</div></li>
                <li><div className="sidebar-item"><i className="nf nf-cod-graph_line"></i>Stats</div></li>
                <li><div className="sidebar-item"><i className="nf nf-md-vector_link"></i>Link Accounts</div></li>
            </ul>
            <ul className="bottomlinks">
                <li><div className="sidebar-item"><i className="nf nf-cod-settings_gear"></i>Settings</div></li>
            </ul>
        </nav>

    )
}

export default Sidebar