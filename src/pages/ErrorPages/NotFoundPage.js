import React from "react";
import Page from "../Page";
import "../../styles/pages/ErrorPage.sass";

function NotFoundPage() {
    return (
        <Page title="Not Found">
            <h1 className="large-status-code-title">404</h1>
            <p className="error-description">
                Page not found...
            </p>
        </Page>
    );
}

export default NotFoundPage;
