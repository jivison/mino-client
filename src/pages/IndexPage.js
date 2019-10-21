import React, { useState } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import Artist from "../models/Artist";
import Album from "../models/Album";
import CardList from "../components/helpers/CardList";
import Card from "../components/helpers/Card";
import Track from "../models/Track";
import FormatDisplay from "../components/helpers/FormatDisplay";
import NodeMenu from "../components/helpers/NodeMenu";
import RequestLink from "../components/helpers/RequestLink";
import Background from "../models/Background";
import spotifyClientId from "../api/spotify.private";

function IndexPage() {
    const [entities, setEntities] = useState([]);
    const [model, setModel] = useState(Artist);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");
    const [fakekey, setFakekey] = useState(Math.random());

    const generatePlaylist = () => {
        let redirectUrl = encodeURIComponent("http://localhost:7879/generate");
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&redirect_uri=${redirectUrl}&scope=user-read-private%20user-read-email%20playlist-modify&response_type=token`;
    };

    return (
        <Page
            title="Collection"
            loadingOverlay={true}
            isLoading={loading}
            loadingMessage={loadingMessage}
        >
            <MinoRequest
                setFunction={setEntities}
                modelAction={model.all}
                fakekey={fakekey}
            >
                <CardList
                    letterBar
                    letterSeps
                    useIdAsLetter
                    cards={entities.map(entity => {
                        return (
                            <Card
                                id={entity.sort_title}
                                key={entity.id}
                                image={
                                    entity.image_url || entity.album.image_url
                                }
                                circularImage={model.endpoint !== "albums"}
                                title={
                                    <>
                                        {entity.title}
                                        <FormatDisplay
                                            formats={entity.formats}
                                        />
                                    </>
                                }
                                subtitle={entity.artist && entity.artist.title}
                                clickHandler={() => {
                                    window.location.href = `/${model.endpoint}/${entity.id}`;
                                }}
                            ></Card>
                        );
                    })}
                >
                    <h1 className="count-title">
                        Your{" "}
                        {model.endpoint.charAt(0).toUpperCase() +
                            model.endpoint
                                .split("")
                                .splice(1)
                                .join("")}{" "}
                        <span className="subtitle">{entities.length}</span>
                    </h1>
                    <NodeMenu initialPrompt="Change View">
                        <p
                            className="option"
                            onClick={() => {
                                setModel(Artist);
                            }}
                        >
                            Artists
                        </p>
                        <p
                            className="option"
                            onClick={() => {
                                setModel(Album);
                            }}
                        >
                            Albums
                        </p>
                        <p
                            className="option"
                            onClick={() => {
                                setModel(Track);
                            }}
                        >
                            Tracks
                        </p>
                    </NodeMenu>
                    <NodeMenu>
                        <RequestLink
                            loadingMessage="Creating artist..."
                            setLoadingMessage={setLoadingMessage}
                            modelAction={Artist.create}
                            setLoading={setLoading}
                            setFakekey={setFakekey}
                            onClickSetProps={() => {
                                let promptAnswer = prompt(
                                    "Which artist would you like to add?"
                                );

                                if (promptAnswer) {
                                    return [{ title: promptAnswer }];
                                } else {
                                    return false;
                                }
                            }}
                        >
                            Add Artist
                        </RequestLink>
                        <RequestLink
                            loadingMessage="Cleaning your collection..."
                            setLoadingMessage={setLoadingMessage}
                            modelAction={Background.clean_collection}
                            setLoading={setLoading}
                            setFakekey={setFakekey}
                        >
                            Clean Collection
                        </RequestLink>
                        <RequestLink
                            loadingMessage="Tagging tracks..."
                            setLoadingMessage={setLoadingMessage}
                            modelAction={Background.find_tags_for_every_track}
                            setLoading={setLoading}
                            setFakekey={setFakekey}
                        >
                            Find Tags For Each Track
                        </RequestLink>
                        <p
                            onClick={() => {
                                window.location.href = "/export";
                            }}
                            className="option"
                        >
                            {"Export ↗"}
                        </p>
                        <p
                            onClick={() => {
                                generatePlaylist();
                            }}
                            className="option"
                        >
                            {"Generate Spotify Playlist ↗"}
                        </p>
                    </NodeMenu>
                </CardList>
            </MinoRequest>
        </Page>
    );
}

export default IndexPage;
