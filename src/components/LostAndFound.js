import React from "react";
import CardList from "./helpers/CardList";
import Card from "./helpers/Card";
import "../styles/LostAndFound.sass"

function LostAndFound({ lost, found }) {
    return (
        <div className="LostAndFound">
            <CardList
                letterSeps
                useIdAsLetter
                cards={lost.map(track => {
                    return (
                        <Card
                            small
                            id={track.sort_title}
                            key={track.id}
                            image={track.album.image_url}
                            title={<>{track.title}</>}
                            subtitle={track.artist && track.artist.title}
                            useChecked
                        />
                    );
                })}
            >
                <h1 className="LostAndFound-title">Lost Tracks</h1>
            </CardList>
            <CardList
                letterSeps
                useIdAsLetter
                cards={found.map(track => {
                    return (
                        <Card
                            small
                            id={track.sort_title}
                            key={track.id}
                            image={track.album.image_url}
                            title={<>{track.title}</>}
                            subtitle={track.artist && track.artist.title}
                            nohover
                        />
                    );
                })}
            >
                <h1 className="LostAndFound-title">Found Tracks</h1>
            </CardList>
        </div>
    );
}

export default LostAndFound;
