import React from "react";
import PropTypes from "prop-types";
import "../../styles/helpers/Image.sass";

function Image({
    src,
    alt="image",
    circle = false,
    square = false,
    width,
    height,
    className,
    onLoad = () => {},
    id=`Image-${Math.random()}`
}) {

    let styles = width ? {width: width} : {}
    
    styles = height ? Object.assign(styles, {height: height}) : styles
    
    return (
        <img
            alt={alt}
            id={id}
            onLoad={onLoad}
            style={styles}
            src={src}
            className={
                (circle && square
                    ? "Image Image-circle Image-square"
                    : circle
                    ? "Image Image-circle"
                    : square
                    ? "Image Image-square"
                    : "Image") + " " + className
            }
        ></img>
    );
}

Image.propTypes = {
    src: PropTypes.string
};

export default Image;
