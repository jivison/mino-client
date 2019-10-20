import React from "react";
import PropTypes from "prop-types";
import "../../styles/helpers/Image.sass";

function Image({ src, circle = false, square = false, width = "auto" }) {
    return (
        <img
            style={{ width: width }}
            src={src}
            className={
                circle && square
                    ? "Image Image-circle Image-square"
                    : circle
                    ? "Image Image-circle"
                    : "Image Image-square"
            }
        />
    );
}

Image.propTypes = {
    src: PropTypes.string
};

export default Image;
