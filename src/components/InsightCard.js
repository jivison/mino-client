import React from "react";
import PropTypes from "prop-types";

function InsightCard({ title, clickHandler, widthOverride, children }) {
    return (
        <React.Fragment>
            <div
                className="InsightCard"
                onClick={clickHandler}
                style={widthOverride ? { width: widthOverride } : {}}
            >
                <h2 className="InsightCard-title">{title}</h2>
                <div className="InsightCard-content">{children}</div>
            </div>
        </React.Fragment>
    );
}

InsightCard.propTypes = {
    title: PropTypes.string,
    clickHandler: PropTypes.func,
    widthOverride: PropTypes.string
};
export default InsightCard;
