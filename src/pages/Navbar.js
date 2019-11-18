import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/helpers/Navbar.sass";
import logo from "../assets/logo-small.svg";
import NodeMenu from "../components/helpers/NodeMenu";

function Navbar({ currentUser, signOutHandler }) {
    currentUser =
        currentUser && typeof currentUser === "string"
            ? JSON.parse(currentUser)
            : currentUser;

    return (
        <nav className="Navbar">
            <NavLink to="/">
                <div className="logo-container">
                    <img src={logo} alt="logo" />
                </div>
            </NavLink>

            {!currentUser && (
                <span className="Navbar-users">
                    <NavLink to="/signin">Sign In</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                </span>
            )}

            {currentUser && (
                <>
                    <NavLink to="/collection">Collection</NavLink>
                    <NavLink to="/seed">Seed</NavLink>
                    <NodeMenu initialPrompt="Maps">
                        <NavLink to="/maps/artist">Artist Maps</NavLink>
                        <br />
                        <NavLink to="/maps/album">Album Maps</NavLink>
                    </NodeMenu>
                    <NavLink to="/additions">Additions</NavLink>
                    <NavLink to="/insights">Insights</NavLink>
                    <p>
                        <span className="username">{currentUser.username}</span>{" "}
                        <span className="link" onClick={signOutHandler}>
                            Sign Out
                        </span>
                    </p>
                </>
            )}
        </nav>
    );
}

export default Navbar;
