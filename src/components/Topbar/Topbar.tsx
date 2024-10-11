import { useContext, useRef } from "react";
import "./topbar.css";
import { UserContext } from "../../services/user";
import { useNavigate } from "react-router-dom";

const Topbar = ({
  logoutUser,
  path,
}: {
  logoutUser: () => void;
  path: string;
}) => {
  const { user } = useContext(UserContext);
  let cleanPath = path.replace("/", "");
  if (cleanPath) {
    cleanPath = capitalizeFirstLetter(cleanPath);
  } else {
    cleanPath = "Dashboard";
  }
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <nav id="topbar">
      <h1>
        {user?.username}'s {cleanPath}
      </h1>
      <div className="rightWidgets">
        <button className="profileIcon" popovertarget="profilepopover">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 -960 960 960"
          >
            <path d="M480-480q-66 0-113-47t-47-113 47-113 113-47 113 47 47 113-47 113-113 47M160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440t130 15.5T736-378q29 15 46.5 43.5T800-272v112zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360t-111 13.5T260-306q-9 5-14.5 14t-5.5 20zm240-320q33 0 56.5-23.5T560-640t-23.5-56.5T480-720t-56.5 23.5T400-640t23.5 56.5T480-560m0 320" />
          </svg>
        </button>
        <ProfilePopover logoutUser={logoutUser} />
      </div>
    </nav>
  );
};

const ProfilePopover = ({ logoutUser }: { logoutUser: () => void }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.hidePopover();
    navigate("/profile");
  };

  return (
    <div ref={ref} id="profilepopover" popover="auto">
      <ul className="popoverOptions">
        <li onClick={handleClick}>Profile</li>
        <li>
          <span id="logout" onClick={logoutUser}>
            Log Out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Topbar;
