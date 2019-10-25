import React, { useState } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import Addition from "../models/Addition";
import CardList from "../components/helpers/CardList";
import Card from "../components/helpers/Card";
import "../styles/pages/AdditionShowPage.sass";

function AdditionShowPage({ match, history }) {
    const [addition, setAddition] = useState({});

    return (
        <Page title="Addition">
            <MinoRequest
                modelAction={Addition.one}
                modelProps={[match.params.id]}
                setFunction={setAddition}
            >
                <h1 className="addition-title">{addition.humanized_type}</h1>
                <h2 className="addition-subtitle">{addition.id_string}</h2>

                <h3 className="addition-subtitle">
                    Added {addition.humanized_date} ago
                </h3>
                <h2 className="addition-count-subtitle">
                    Contains {addition.tracks && addition.tracks.length} tracks.
                </h2>

                <button className="button delete" onClick={() => {
                    Addition.destroy(addition.id).then((response) => {
                        history.push(`/additions`)
                    })
                }}>Undo addition</button>

                <CardList
                    letterBar
                    letterSeps
                    useIdAsLetter
                    cards={
                        addition.tracks &&
                        addition.tracks
                            .sort((a, b) => {
                                if (a.sort_title > b.sort_title) {
                                    return 1;
                                } else if (a.sort_title < b.sort_title) {
                                    return -1;
                                }
                                return 0;
                            })
                            .map(track => {
                                return (
                                    <Card
                                        id={track.sort_title}
                                        key={track.id}
                                        image={track.album.image_url}
                                        // circularImage={true}
                                        title={<>{track.title}</>}
                                        subtitle={
                                            track.artist && track.artist.title
                                        }
                                        clickHandler={() => {
                                            let entityId = track.album.id;
                                            history.push(
                                                `/collection/albums/${entityId}?addition=${addition.id}`
                                            );
                                        }}
                                    ></Card>
                                );
                            })
                    }
                >
                    <h2 className="Addition-tracks-title">Tracks in this addition:</h2>
                </CardList>
            </MinoRequest>
        </Page>
    );
}

export default AdditionShowPage;
