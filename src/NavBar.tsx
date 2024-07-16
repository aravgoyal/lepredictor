import { NavLink } from "react-router-dom";
import { logout } from './auth/authFeatures';


import "./index.css";
import logo from "./assets/logo.png";

export function NavBar() {
  return (
    <nav className="navbar-container">
      <div>
        <li><a><NavLink to="/home"><img src={logo} alt="Logo" /></NavLink></a></li>
        <li><a className="predict"><NavLink to="/nba">NBA</NavLink></a></li>
        <li><a className="predict"><NavLink to="/nfl">NFL</NavLink></a></li>
        <li><a className="predict"><NavLink to="/premierleague">Premier League</NavLink></a></li>
        <li><a onClick={logout} className="logout"><NavLink to="/">Log out</NavLink></a></li>
      </div>
    </nav>
  );
}