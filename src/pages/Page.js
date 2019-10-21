import React from "react";
import PropTypes from "prop-types";
import LoadingOverlay from "react-loading-overlay";

function Page({
    title,
    children,
    loadingOverlay = false,
    isLoading = false,
    loadingMessage = "Loading..."
}) {
    document.title = "Mino" + (title ? " | " + title : "");

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
