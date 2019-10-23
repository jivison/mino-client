import React, { useState, useEffect } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import Album from "../models/Album";
import Image from "../components/helpers/Image";
import ActionButtons from "../components/helpers/ActionButtons";
import TrackList from "../components/helpers/TrackList";
import NodeMenu from "../components/helpers/NodeMenu";
import post from "../api/post";
import Background from "../models/Background";
import RequestLink from "../components/helpers/RequestLink";
import FormatDisplay from "../components/helpers/FormatDisplay";
import Track from "../models/Track";
import qs from "querystring";

function AlbumShowPage({ match, history, location }) {
    const [album, setAlbum] = useState({});
    const [tracks, setTracks] = useState([]);
    const [fakekey, setFakekey] = useState(Math.random());
    // Loading with post requests
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");

    let additionId = parseInt(
        new URLSearchParams(location.search).get("addition")
    );

    console.log(additionId);
    useEffect(() => {
        console.log(album.tracks);
        if (additionId && album.tracks) {
            setTracks(
                album.tracks.filter(track => {
                    return track.addition_ids.includes(additionId);
                })
            );
        } else {
            setTracks(album.tracks);
        }
        return () => {};
    }, [album]);

    const albumId = match.params.id;

    return (
        <Page
            title="Album"
            loadingOverlay={true}
            isLoading={loading}
            loadingMessage={loadingMessage}
        >
            <MinoRequest
                modelAction={Album.one}
                modelProps={[albumId, additionId]}
                setFunction={setAlbum}
                fakekey={fakekey}
            >
                {additionId === NaN && (
                    <p className="AlbumShowPage-addition-description">
                        You are viewing only the tracks that belong to the
                        addition{" "}
                        <a
                            href="#"
                            onClick={() => {
                                history.push(`/additions/${additionId}`);
                            }}
                        >
                            {additionId}
                        </a>
                        <br />
                        <a
                            href="#"
                            onClick={() => {
                                history.push(`/collection/albums/${album.id}`);
                            }}
                        >
                            Click here
                        </a>{" "}
                        to view the original album.
                    </p>
                )}
                <Image src={album.image_url} width="10vw" square />
                <h1
                    className="as-link Album-title"
                    onClick={() => {
                        history.push(`/maps/album/${album.id}`);
                    }}
                >
                    {album.title}
                </h1>
                <h2 className="Album-subtitle">
                    <a
                        onClick={e => {
                            e.preventDefault();
                            history.push(
                                `/collection/artists/${album.artist &&
                                    album.artist.id}`
                            );
                        }}
                        className="Album-artist-link"
                        href={`/collection/artists/${album.artist &&
                            album.artist.id}`}
                    >
                        {album.artist && album.artist.title}
                    </a>
                </h2>
                <FormatDisplay formats={album.formats} />
                <NodeMenu>
                    <RequestLink
                        loadingMessage="Creating track..."
                        setLoadingMessage={setLoadingMessage}
                        modelAction={Track.create}
                        setLoading={setLoading}
                        setFakekey={setFakekey}
                        onClickSetProps={() => {
                            let promptAnswer = prompt(
                                "What track would you like to add?"
                            );

                            if (promptAnswer) {
                                return [
                                    {
                                        album_id: album.id,
                                        artist_id: album.artist.id,
                                        title: promptAnswer
                                    }
                                ];
                            } else {
                                return false;
                            }
                        }}
                    >
                        Add Track
                    </RequestLink>
                    <RequestLink
                        loadingMessage="Getting album art..."
                        setLoadingMessage={setLoadingMessage}
                        modelAction={Background.get_album_art}
                        modelProps={[album]}
                        setLoading={setLoading}
                        setFakekey={setFakekey}
                    >
                        Get Album Art
                    </RequestLink>
                    <RequestLink
                        loadingMessage="Tagging Tracks..."
                        setLoadingMessage={setLoadingMessage}
                        modelAction={Background.add_tags_to_album}
                        setLoading={setLoading}
                        setFakekey={setFakekey}
                        onClickSetProps={() => {
                            let promptAnswer = prompt(
                                "What tags would you like to add? (seperate multiple tags with commas)"
                            );

                            if (promptAnswer) {
                                return [album.id, promptAnswer.split(/ *, */g)];
                            } else {
                                return false;
                            }
                        }}
                    >
                        Add Tags To Each Track
                    </RequestLink>
                    <RequestLink
                        loadingMessage="Finding Tags..."
                        setLoadingMessage={setLoadingMessage}
                        modelAction={Background.find_tags_for_albums_tracks}
                        modelProps={[album.id]}
                        setLoading={setLoading}
                        setFakekey={setFakekey}
                    >
                        Find Tags For Each Track
                    </RequestLink>
                </NodeMenu>

                <TrackList
                    tracks={tracks}
                    editable
                    artist={album.artist}
                    setTracks={setTracks}
                    setFakekey={setFakekey}
                />

                <ActionButtons
                    model={Album}
                    setFunction={setAlbum}
                    entity={album}
                    entityName="Album"
                    editFields={["title", "image_url"]}
                    history={history}
                    merge
                    move
                />
            </MinoRequest>
        </Page>
    );
}

export default AlbumShowPage;
