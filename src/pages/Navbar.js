import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/helpers/Navbar.sass";
import logo from "../assets/logo-small.svg";

function Navbar() {
    return (
        <nav className="Navbar">
            <NavLink to="/">
                <div className="logo-container">
                    <img src={logo} />
                </div>
            </NavLink>

            <NavLink to="/collection">Collection</NavLink>
            <NavLink to="/seed">Seed</NavLink>
            <NavLink to="/maps/artist">Artist Maps</NavLink>
            <NavLink to="/maps/album">Album Maps</NavLink>
            <NavLink to="/additions">Additions</NavLink>
            <NavLink to="/insights">Insights</NavLink>
        </nav>
    );
}

export default Navbar;
