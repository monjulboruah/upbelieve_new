import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import {GlobalState} from "../../GlobalState"

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const state = useContext(GlobalState);
  const [isLoggedIn] = state.isLoggedIn;
  console.log(isLoggedIn)

  const logout =(e) => {
    localStorage.removeItem("loginStatus")
    localStorage.removeItem("role")    
    localStorage.removeItem("userId")
    localStorage.removeItem("token")
    window.location.href = "/landing-page"
  }

  return (
    <div>
      {
        isLoggedIn === false ? (
          <div></div>
        ) : (
<div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Upbelieve</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">Incident</p>
          <Link to="/all-zone" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>All Incidents</span>
            </li>
          </Link>
          <Link to="/create-zone" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Create Zone</span>
            </li>
          </Link>
          <Link to="/product-classification" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Product Classification</span>
          </li>
          </Link>
          
          
          
          
          <p className="title">Incident Maagement</p>
          <Link to="/create-incident" style={{ textDecoration: "none" }}>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Create Incident</span>
          </li>
          </Link>
          <Link to="/all-incident" style={{ textDecoration: "none" }}>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>View All Incidents</span>
          </li>
          </Link>
          
          <p className="title">Zone Management</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Create Zone</span>
          </li>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>All Zones</span>
          </li>
          <button
          onClick={(e) => logout}
        >
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </button>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
        )
      }
    </div>
    
  );
};

export default Sidebar;
