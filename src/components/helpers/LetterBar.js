import React from "react";
import PropTypes from "prop-types";
import "../../styles/helpers/LetterBar.sass";

function LetterBar({ letters }) {
    return (
        <div className="LetterBar">
            {letters.map(letter => (
                <a className="letter" href={`#${letter}`} key={letter}>
                    <p>{letter}</p>
                </a>
            ))}
        </div>
    );
}

LetterBar.propTypes = {
    letters: PropTypes.arrayOf(PropTypes.string)
};

export default LetterBar;
