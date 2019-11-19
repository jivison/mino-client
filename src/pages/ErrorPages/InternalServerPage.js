import React from "react";
import Page from "../Page";
import "../../styles/pages/ErrorPage.sass";

function InternalServerPage() {
    return (
        <Page title="Internal Server Error">
            <h1 className="large-status-code-title">500</h1>
            <p className="error-description">Something went wrong...</p>
        </Page>
    );
}

export default InternalServerPage;
