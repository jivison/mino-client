import React from "react";
import PropTypes from "prop-types";
import "../../styles/helpers/LetterBar.sass";

function LetterBar({ letters }) {
    return (
        <div className="LetterBar">
            {(letters.length > 25
                ? letters.reduce((acc, letter, idx) => {
                      (idx % 3 === 0 ? [] : acc).push(letter);
                      return acc;
                  }, [])
                : letters
            ).map(letter => (
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
