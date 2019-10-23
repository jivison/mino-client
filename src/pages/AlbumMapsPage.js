import React, { useState } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import Card from "../components/helpers/Card";
import CardList from "../components/helpers/CardList";
import AlbumMap from "../models/AlbumMap";

function AlbumMapsPage({ history }) {
    const [albumMaps, setAlbumMaps] = useState([]);

    return (
        <Page title="Album Maps">
            <MinoRequest modelAction={AlbumMap.all} setFunction={setAlbumMaps}>
                <CardList
                    letterBar
                    letterSeps
                    useIdAsLetter
                    cards={Object.keys(albumMaps)
                        .sort()
                        .filter(albumName => {
                            return albumMaps[albumName].length > 1;
                        })
                        .map(album => {
                            return (
                                <Card
                                    title={album}
                                    id={album}
                                    clickHandler={() => {
                                        history.push(`/maps/album/${albumMaps[album][0].album_id}`);
                                    }}
                                >
                                    <ul className="map-list">
                                        {albumMaps[album]
                                            .filter(albumMap => {
                                                return albumMap.input !== album;
                                            })
                                            .map(albumMap => {
                                                return (
                                                    <li>⮤ {albumMap.input}</li>
                                                );
                                            })}
                                    </ul>
                                </Card>
                            );
                        })}
                >
                    <h1 className="AlbumMapPage-title">Your Album Maps</h1>
                </CardList>
            </MinoRequest>
        </Page>
    );
}

export default AlbumMapsPage;
