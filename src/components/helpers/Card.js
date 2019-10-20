import React from "react";
import PropTypes from "prop-types";
import "../../styles/helpers/Card.sass";

function Card({
    nohover = true,
    children,
    id,
    image,
    circularImage = true,
    title = ""
}) {
    return (
        <div id={id} className={!nohover ? "Card Card-hover" : "Card"}>
            <img
                src={image}
                alt={id}
                className={circularImage ? "Card-image circular" : "Card-image"}
            />
            <h2 className="Card-title">{title}</h2>
            {children}
        </div>
    );
}

Card.propTypes = {
    hover: PropTypes.bool,
    image: PropTypes.string,
    circularImage: PropTypes.bool
};

export default Card;
