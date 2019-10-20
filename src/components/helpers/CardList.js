import React, { useState, useEffect } from "react";
import "../../styles/helpers/CardList.sass";
import PropTypes from "prop-types";
import LetterBar from "./LetterBar";

function CardList({
    letterBar = false,
    letterSeps = false,
    initialLetters = [],
    useIdAsLetter = false,
    cards=[],
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
                    {children}
                    {!letterSeps
                        ? cards
                        : cards.map(card => {
                              if (currentLetter !== card.props.id.charAt(0)) {
                                  currentLetter = card.props.id.charAt(0);
                                  return (
                                      <>
                                          <div
                                              id={card.props.id
                                                  .charAt(0)
                                                  .toUpperCase()}
                                              className="letter-sep"
                                          >
                                              <h1 className="letter-sep-title">
                                                  {card.props.id
                                                      .charAt(0)
                                                      .toUpperCase()}
                                              </h1>
                                          </div>
                                          {card}
                                      </>
                                  );
                              } else {
                                  return card;
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
    letters: PropTypes.array,
    cards: PropTypes.array
};

export default CardList;
