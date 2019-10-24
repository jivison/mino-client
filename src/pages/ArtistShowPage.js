import React, { useState } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import Artist from "../models/Artist";
import Image from "../components/helpers/Image";
import AlbumArtistList from "../components/AlbumArtistList";
import ActionButtons from "../components/helpers/ActionButtons";
import NodeMenu from "../components/helpers/NodeMenu";
import RequestLink from "../components/helpers/RequestLink";
import Background from "../models/Background";
import Album from "../models/Album";
import FormatDisplay from "../components/helpers/FormatDisplay";
import "../styles/pages/ArtistShowPage.sass";
import Grade from "grade-js"

function ArtistShowPage({ match, history }) {
    const [artist, setArtist] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");
    const [fakekey, setFakekey] = useState(Math.random());

    const artistId = match.params.id;

    return (
        <Page
            title={"Artist"}
            loadingOverlay={true}
            isLoading={loading}
            loadingMessage={loadingMessage}
        >
            <MinoRequest
                modelAction={Artist.one}
                modelProps={[artistId]}
                setFunction={setArtist}
                fakekey={fakekey}
            >
                <div className="ArtistShowPage-header">
                    <img
                        id="artist-image"
                        crossOrigin="anonymous"
                        className="Image-square Image-circle Image"
                        style={{ width: "10vw", height: "10vw" }}
                        src={artist.image_url}
                        onLoad={() => {
                            Grade(
                                document.querySelectorAll("html"),
                                "#artist-image"
                            );
                        }}
                    ></img>
                    <h1
                        className="as-link Artist-title"
                        onClick={() => {
                            history.push(`/maps/artist/${artist.id}`);
                        }}
                    >
                        {artist.title}
                    </h1>
                    <NodeMenu>
                        <RequestLink
                            loadingMessage="Creating album..."
                            setLoadingMessage={setLoadingMessage}
                            modelAction={Album.create}
                            setLoading={setLoading}
                            setFakekey={setFakekey}
                            onClickSetProps={() => {
                                let promptAnswer = prompt(
                                    "What album would you like to add?"
                                );

                                if (promptAnswer) {
                                    return [artist.id, { title: promptAnswer }];
                                } else {
                                    return false;
                                }
                            }}
                        >
                            Add Album
                        </RequestLink>
                        <RequestLink
                            loadingMessage="Getting artist art..."
                            setLoadingMessage={setLoadingMessage}
                            modelAction={Background.get_artist_art}
                            modelProps={[artist]}
                            setLoading={setLoading}
                            setFakekey={setFakekey}
                        >
                            Get Artist Art
                        </RequestLink>
                        <RequestLink
                            loadingMessage="Tagging Tracks..."
                            setLoadingMessage={setLoadingMessage}
                            modelAction={Background.add_tags_to_artist}
                            setLoading={setLoading}
                            setFakekey={setFakekey}
                            onClickSetProps={() => {
                                let promptAnswer = prompt(
                                    "What tags would you like to add? (seperate multiple tags with commas)"
                                );

                                if (promptAnswer) {
                                    return [
                                        artist.id,
                                        promptAnswer.split(/ *, */g)
                                    ];
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
                            modelAction={
                                Background.find_tags_for_artists_tracks
                            }
                            modelProps={[artist.id]}
                            setLoading={setLoading}
                            setFakekey={setFakekey}
                        >
                            Find Tags For Each Track
                        </RequestLink>
                    </NodeMenu>
                    <FormatDisplay formats={artist.formats} />
                </div>
                <AlbumArtistList albums={artist.albums} history={history} />
                <ActionButtons
                    model={Artist}
                    setFunction={setArtist}
                    entity={artist}
                    entityName="Artist"
                    editFields={["title", "image_url"]}
                    history={history}
                    mergeRedirectEndpoint={"artists"}
                    merge
                />
            </MinoRequest>
        </Page>
    );
}

export default ArtistShowPage;
