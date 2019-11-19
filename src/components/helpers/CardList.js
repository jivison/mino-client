import React, { useState, useEffect } from "react";
import "../../styles/helpers/CardList.sass";
import PropTypes from "prop-types";
import LetterBar from "./LetterBar";

function CardList({
    letterBar = false,
    letterSeps = false,
    initialLetters = [],
    useIdAsLetter = false,
    cards = [],
    emptyMessage = "None yet!",
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
        } else {
            setLetters(initialLetters);
        }
        return () => {};
    }, [cards]);

    return (
        <>
            <div className="CardList">
                {letterBar && <LetterBar letters={letters} />}
                <div className={letterBar ? "CardList-content" : ""}>
                    {children}
                    <p className="empty-text">
                        {cards.length < 1 && emptyMessage}
                    </p>
                    {!letterSeps
                        ? cards
                        : cards.map(card => {
                              if (currentLetter !== card.props.id.charAt(0)) {
                                  currentLetter = card.props.id.charAt(0);
                                  return (
                                      <React.Fragment key={Math.random()}>
                                          <div
                                            key={Math.random()}
                                              id={card.props.id
                                                  .charAt(0)
                                                  .toUpperCase()}
                                              className="letter-sep"
                                          >
                                              <h1 className="letter-sep-title" key={card.props.id}>
                                                  {card.props.id
                                                      .charAt(0)
                                                      .toUpperCase()}
                                              </h1>
                                          </div>
                                          {card}
                                      </React.Fragment>
                                  );
                              } else {
                                  return <div key={Math.random()}>card</div>;
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
