import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/helpers/Card.sass";
import Image from "./Image";

function Card({
    nohover = false,
    children,
    id,
    image = "",
    circularImage = true,
    title = "",
    subtitle = "",
    clickHandler = function() {},
    className = "",
    border = false,
    small = false,
    useChecked
}) {
    const [checked, setChecked] = useState(false);

    return (
        <div
            id={id}
            className={
                (!nohover ? "Card Card-hover" : "Card") +
                (small ? " Card-small " : "") +
                (border ? " Card-border " : " ") +
                className
            }
            onClick={event => {
                useChecked && setChecked(!checked);
                clickHandler(event);
            }}
        >
            <span className="Card-content">
                {image && (
                    <Image
                        circle={circularImage}
                        square
                        src={image}
                        className="Card-image"
                    />
                )}
                <div className="Card-titles">
                    <h2 className="Card-title">{title}</h2>
                    {subtitle && <h2 className="Card-subtitle">{subtitle}</h2>}
                </div>
                {useChecked && (
                    <p className="Card-check">
                        {checked ? (
                            <i class="far fa-check-square"></i>
                        ) : (
                            <i class="far fa-square"></i>
                        )}
                    </p>
                )}
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
