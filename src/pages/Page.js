import React from "react";
import PropTypes from "prop-types";

function Page({ title, children }) {

    document.title = "Mino | " + title

    return (
        <div className="Page">
            {children}
        </div>
    )

}

Page.propTypes = {
    title: PropTypes.string
};

export default Page