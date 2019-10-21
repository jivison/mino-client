import React from "react";
import PropTypes from "prop-types";
import "../../styles/helpers/Card.sass";

function Card({
    nohover = false,
    children,
    id,
    image = "",
    circularImage = true,
    title = "",
    subtitle = "",
    clickHandler = function() {},
    className=""
}) {
    return (
        <div
            id={id}
            className={(!nohover ? "Card Card-hover" : "Card") + " " + className}
            onClick={clickHandler}
        >
            <span className="Card-content">
                {image && (
                    <img
                        src={image}
                        alt={id}
                        className={
                            circularImage ? "Card-image circular" : "Card-image"
                        }
                    />
                )}
                <div className="Card-titles">
                    <h2 className="Card-title">{title}</h2>
                    {subtitle && <h2 className="Card-subtitle">{subtitle}</h2>}
                </div>
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
