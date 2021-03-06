import React, { useState } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import ArtistMap from "../models/ArtistMap";
import Card from "../components/helpers/Card";
import CardList from "../components/helpers/CardList";
import "../styles/pages/MapsPage.sass";

function ArtistMapsPage({ history }) {
    const [artistMaps, setArtistMaps] = useState({});

    return (
        <Page title="Artist Maps">
            <MinoRequest
                modelAction={ArtistMap.all}
                setFunction={setArtistMaps}
            >
                {artistMaps.maps && (
                    <CardList
                        letterBar
                        letterSeps
                        useIdAsLetter
                        cards={Object.keys(artistMaps.maps)
                            .sort()
                            .filter(artistName => {
                                return artistMaps.maps[artistName].filter(artistMap => {
                                    return (
                                        artistMap.input !== artistName
                                    );
                                }).length > 0
                            })
                            .map(artist => {
                                return (
                                    <Card
                                        title={artist}
                                        id={artistMaps.sort_titles[artist]}
                                        clickHandler={() => {
                                            history.push(
                                                `/maps/artist/${artistMaps.maps[artist][0].artist_id}`
                                            );
                                        }}
                                    >
                                        <ul className="map-list">
                                            {artistMaps.maps[artist]
                                                .filter(artistMap => {
                                                    return (
                                                        artistMap.input !==
                                                        artist
                                                    );
                                                })
                                                .map(artistMap => {
                                                    return (
                                                        <li>
                                                            ⮤ {artistMap.input}
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </Card>
                                );
                            })}
                    >
                        <h1 className="ArtistMapPage-title">
                            Your Artist Maps
                        </h1>
                    </CardList>
                )}
            </MinoRequest>
        </Page>
    );
}

export default ArtistMapsPage;
