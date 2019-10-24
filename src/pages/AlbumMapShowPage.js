import React, { useState } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import Image from "../components/helpers/Image";
import AlbumMap from "../models/AlbumMap";
import Album from "../models/Album";
import "../styles/pages/MapShowPage.sass"

function AlbumMapShowPage({ match, history }) {
    const [albumMaps, setAlbumMaps] = useState([]);
    const [album, setAlbum] = useState({});

    const deleteMap = event => {
        let albumMapId = parseInt(event.currentTarget.id);
        AlbumMap.destroy(albumMapId).then(response => {
            setAlbumMaps(
                albumMaps.filter(albumMap => {
                    return albumMap.id !== albumMapId;
                })
            );
        });
    };

    const albumId = match.params.id;

    return (
        <Page title="Album Map">
            <MinoRequest
                modelAction={AlbumMap.show}
                modelProps={[albumId]}
                setFunction={setAlbumMaps}
            >
                <MinoRequest
                    modelAction={Album.one}
                    modelProps={[albumId]}
                    setFunction={setAlbum}
                    noLoading={true}
                >
                    <Image src={album.image_url} width="10vw" circle square />
                    <h1 className="Album-title">
                        <span
                            className="as-link"
                            onClick={() => {
                                history.push(`/collection/albums/${albumId}`);
                            }}
                        >
                            {album.title}
                        </span>{" "}
                        Maps
                    </h1>
                    <ul className="AlbumMap-list">
                        {albumMaps.length > 1
                            ? albumMaps
                                  .filter(albumMap => {
                                      return albumMap.input != album.title;
                                  })
                                  .map(albumMap => {
                                      return (
                                          <li>
                                              ⮤ {albumMap.input}{" "}
                                              <span
                                                  className="AlbumMap-remove"
                                                  onClick={deleteMap}
                                                  id={albumMap.id}
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

export default AlbumMapShowPage;
