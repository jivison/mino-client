import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingOverlay from "react-loading-overlay";
import "../styles/pages/Page.sass";

function Page({
    title,
    children,
    loadingOverlay = false,
    isLoading = false,
    loadingMessage = "Loading..."
}) {
    document.title = "Mino" + (title ? " | " + title : "");

    useEffect(() => {
        document.querySelector("html").style.background = "black";
        return () => {};
    }, []);

    return (
        <div className="Page">
            {loadingOverlay ? (
                <LoadingOverlay
                    active={isLoading}
                    spinner
                    text={loadingMessage}
                >
                    <div className="Page-content">{children}</div>
                </LoadingOverlay>
            ) : (
                <div className="Page-content">{children}</div>
            )}
        </div>
    );
}

Page.propTypes = {
    title: PropTypes.string
};

export default Page;
