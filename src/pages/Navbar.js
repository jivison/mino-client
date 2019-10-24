import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/helpers/Navbar.sass";
import logo from "../assets/logo-small.svg";
import NodeMenu from "../components/helpers/NodeMenu";

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
            <NodeMenu initialPrompt="Maps">
                <NavLink to="/maps/artist">Artist Maps</NavLink>
                <br />
                <NavLink to="/maps/album">Album Maps</NavLink>
            </NodeMenu>
            <NavLink to="/additions">Additions</NavLink>
            <NavLink to="/insights">Insights</NavLink>
        </nav>
    );
}

export default Navbar;
