import React from "react";
import "../../styles/pages/ErrorPage.sass";

function RecordNotFound({ recordName, id, backLink = "#back" }) {
    return (
        <div>
            <h1 className="large-status-code-title">404</h1>
            <p className="error-description">
                Can't find {recordName} with id{" "}
                <span className="highlight">{id}</span>.{" "}
                <a
                    className="back-link"
                    href={backLink}
                    onClick={() =>
                        backLink === "#back"
                            ? window.history.back()
                            : (window.location.href = backLink)
                    }
                >
                    Go Back?
                </a>
            </p>
        </div>
    );
}

export default RecordNotFound;
