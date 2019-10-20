import React from "react";
import PropTypes from "prop-types";
import "../../styles/helpers/Card.sass";

function Card({
    nohover = false,
    children,
    id,
    image,
    circularImage = true,
    title = "",
    subtitle = "",
    clickHandler = function() {}
}) {
    return (
        <div
            id={id}
            className={!nohover ? "Card Card-hover" : "Card"}
            onClick={clickHandler}
        >
            <span className="Card-titles">
                <img
                    src={image}
                    alt={id}
                    className={
                        circularImage ? "Card-image circular" : "Card-image"
                    }
                />
                <h2 className="Card-title">{title}</h2>
                <h2 className="Card-subtitle">{subtitle}</h2>
            </span>
            <div className="Card-children">{children}</div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    hover: PropTypes.bool,
    circularImage: PropTypes.bool,
    clickHandler: PropTypes.func
};

export default Card;
