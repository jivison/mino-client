import React, { useState, useEffect } from "react";
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
import FormatFilter from "../components/FormatFilter";
import "../styles/pages/IndexPage.sass";

const endpointToModel = endpoint => {
    return { artists: Artist, albums: Album, tracks: Track }[endpoint];
};

function IndexPage({ history }) {
    const [originalEntities, setOriginalEntities] = useState([]);
    const [entities, setEntities] = useState(originalEntities);
    const [model, setModel] = useState("artists");
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");
    const [fakekey, setFakekey] = useState(Math.random());
    const [sessionFakekey, setSessionFakekey] = useState(Math.random());

    const generatePlaylist = () => {
        let redirectUrl = encodeURIComponent("http://localhost:7879/generate");
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&redirect_uri=${redirectUrl}&scope=user-read-private%20user-read-email%20playlist-modify&response_type=token`;
    };

    const changeView = model => {
        Background.change_session({
            session_key: "focus",
            session_value: model
        }).then(response => {
            setSessionFakekey(Math.random());
        });
    };

    useEffect(() => {
        setFakekey(Math.random());
        return () => {};
    }, [model]);

    useEffect(() => {
        setEntities(originalEntities);
        return () => {};
    }, [originalEntities]);

    return (
        <Page
            title="Collection"
            loadingOverlay={true}
            isLoading={loading}
            loadingMessage={loadingMessage}
        >
            <MinoRequest
                setFunction={setModel}
                modelAction={Background.get_session}
                modelProps={["focus"]}
                fakekey={sessionFakekey}
                part="message"
                noLoading
            >
                <MinoRequest
                    setFunction={setOriginalEntities}
                    modelAction={endpointToModel(model).all}
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
                                        entity.image_url ||
                                        entity.album.image_url
                                    }
                                    circularImage={model !== "albums"}
                                    title={
                                        <>
                                            {entity.title}
                                            <FormatDisplay
                                                formats={entity.formats}
                                            />
                                        </>
                                    }
                                    subtitle={
                                        entity.artist && entity.artist.title
                                    }
                                    clickHandler={() => {
                                        let endpoint =
                                            model === "tracks"
                                                ? "albums"
                                                : model;
                                        let entityId =
                                            model === "tracks"
                                                ? entity.album.id
                                                : entity.id;
                                        history.push(
                                            `/collection/${endpoint}/${entityId}`
                                        );
                                    }}
                                ></Card>
                            );
                        })}
                    >
                        <div className="IndexPage-header">
                            <h1 className="count-title">
                                Your{" "}
                                {model.charAt(0).toUpperCase() +
                                    model
                                        .split("")
                                        .splice(1)
                                        .join("")}{" "}
                                <span className="subtitle">
                                    {entities.length}
                                </span>
                            </h1>
                            <NodeMenu>
                                <RequestLink
                                    loadingMessage="Creating artist..."
                                    setLoadingMessage={setLoadingMessage}
                                    modelAction={endpointToModel(model).create}
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
                                    modelAction={
                                        Background.find_tags_for_every_track
                                    }
                                    setLoading={setLoading}
                                    setFakekey={setFakekey}
                                >
                                    Find Tags For Each Track
                                </RequestLink>
                                <p
                                    onClick={() => {
                                        history.push("/export");
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
                            <FormatFilter
                                entities={originalEntities}
                                setFunction={setEntities}
                            />
                            <NodeMenu initialPrompt="Change View">
                                <p
                                    className="option"
                                    onClick={() => {
                                        changeView("artists");
                                    }}
                                >
                                    Artists
                                </p>
                                <p
                                    className="option"
                                    onClick={() => {
                                        changeView("albums");
                                    }}
                                >
                                    Albums
                                </p>
                                <p
                                    className="option"
                                    onClick={() => {
                                        changeView("tracks");
                                    }}
                                >
                                    Tracks
                                </p>
                            </NodeMenu>
                        </div>
                    </CardList>
                </MinoRequest>
            </MinoRequest>
        </Page>
    );
}

export default IndexPage;
