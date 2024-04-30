import { NavLink } from "react-router-dom";

import "./index.css";
import logo from "./assets/logo.png";

export function NavBar() {
  return (
    <nav className="navbar-container">
      <div>
        <li><a href="/"><NavLink exact to="/"><img src={logo} alt="Logo" /></NavLink></a></li>
        <li><a className="about" href="/about"><NavLink to="/about">About</NavLink></a></li>
        <li><a className="predict" href="/predict"><NavLink to="/predict">Predict</NavLink></a></li>
      </div>
      <div>
        <li><a className="login" href="/login"><NavLink to="/login">Login</NavLink></a></li>
      </div>
    </nav>
  );
}