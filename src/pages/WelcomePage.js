import React from "react";
import Page from "./Page";
import logo from "../assets/logo.svg";

function WelcomePage() {
    return (
        <Page title="Welcome">
            <h1 className="WelcomePage-title">
                <div className="logo-container">
                    <img src={logo} alt="big logo" />
                </div>
            </h1>
        </Page>
    );
}

export default WelcomePage;
