import React, { useState, useEffect } from "react";
import "../../styles/helpers/CardList.sass";
import PropTypes from "prop-types";
import LetterBar from "./LetterBar";

function CardList({
    letterBar = false,
    letterSeps = false,
    initialLetters = [],
    useIdAsLetter = false,
    children
}) {
    const [letters, setLetters] = useState(initialLetters);

    let currentLetter = "";

    useEffect(() => {
        if (useIdAsLetter) {
            let newLetters = [];
            document.querySelectorAll(".Card").forEach(card => {
                newLetters.push(card.id.charAt(0));
            });
            newLetters = [...new Set(newLetters)];
            newLetters.sort();
            setLetters(newLetters);
        }
        return () => {};
    }, []);

    return (
        <>
            <div className="CardList">
                {letterBar && <LetterBar letters={letters} />}
                <div className={letterBar ? "CardList-content" : ""}>
                    {!letterSeps
                        ? children
                        : children.map(child => {
                              if (currentLetter !== child.props.id.charAt(0)) {
                                  currentLetter = child.props.id.charAt(0);
                                  return (
                                      <>
                                          <div
                                              id={child.props.id
                                                  .charAt(0)
                                                  .toUpperCase()}
                                              className="letter-sep"
                                          >
                                              <h1 className="letter-sep-title">
                                                  {child.props.id
                                                      .charAt(0)
                                                      .toUpperCase()}
                                              </h1>
                                          </div>
                                          {child}
                                      </>
                                  );
                              } else {
                                  return child;
                              }
                          })}
                </div>
            </div>
        </>
    );
}

CardList.propTypes = {
    letterSeps: PropTypes.bool,
    letterBar: PropTypes.bool,
    letters: PropTypes.array
};

export default CardList;
