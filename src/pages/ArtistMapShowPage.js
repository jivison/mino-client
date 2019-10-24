import React, { useState } from "react";
import Page from "./Page";
import ArtistMap from "../models/ArtistMap";
import MinoRequest from "../api/MinoRequest";
import Artist from "../models/Artist";
import Image from "../components/helpers/Image";
import "../styles/pages/MapShowPage.sass"

function ArtistMapShowPage({ history, match }) {
    const [artistMaps, setArtistMaps] = useState([]);
    const [artist, setArtist] = useState({});

    const deleteMap = event => {
        let artistMapId = parseInt(event.currentTarget.id);
        ArtistMap.destroy(artistMapId).then(response => {
            setArtistMaps(
                artistMaps.filter(artistMap => {
                    return artistMap.id !== artistMapId;
                })
            );
        });
    };

    const artistId = match.params.id;

    return (
        <Page title="Artist Map">
            <MinoRequest
                modelAction={ArtistMap.show}
                modelProps={[artistId]}
                setFunction={setArtistMaps}
            >
                <MinoRequest
                    modelAction={Artist.one}
                    modelProps={[artistId]}
                    setFunction={setArtist}
                    noLoading={true}
                >
                    <Image src={artist.image_url} width="10vw" circle square />
                    <h1 className="Artist-title">
                        <span
                            onClick={() => {
                                history.push(
                                    `/collection/artists/${artist.id}`
                                );
                            }}
                            className="as-link"
                        >
                            {artist.title}
                        </span>{" "}
                        Maps
                    </h1>
                    <ul className="ArtistMap-list">
                        {artistMaps.length > 1
                            ? artistMaps
                                  .filter(artistMap => {
                                      return artistMap.input != artist.title;
                                  })
                                  .map(artistMap => {
                                      return (
                                          <li>
                                              ⮤ {artistMap.input}{" "}
                                              <span
                                                  className="ArtistMap-remove"
                                                  onClick={deleteMap}
                                                  id={artistMap.id}
                                              >
                                                  <i className="fas fa-times"></i>
                                              </span>
                                          </li>
                                      );
                                  })
                            : "None yet!"}
                    </ul>
                </MinoRequest>
            </MinoRequest>
        </Page>
    );
}

export default ArtistMapShowPage;
