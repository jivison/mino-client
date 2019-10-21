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

function AlbumShowPage() {
    const [album, setAlbum] = useState({});
    const [tracks, setTracks] = useState([]);
    const [fakekey, setFakekey] = useState(Math.random());
    // Loading with post requests
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");

    useEffect(() => {
        setTracks(album.tracks);
        return () => {};
    }, [album]);

    useEffect(() => {
        console.log("Key changed");
        return () => {};
    }, [fakekey]);

    return (
        <Page
            title="Album"
            loadingOverlay={true}
            isLoading={loading}
            loadingMessage={loadingMessage}
        >
            <MinoRequest
                modelAction={Album.one}
                modelProps={[297]}
                setFunction={setAlbum}
                fakekey={fakekey}
            >
                <Image src={album.image_url} width="10vw" square />
                <h1 className="Album-title">{album.title}</h1>
                <h2 className="Album-subtitle">
                    <a
                        className="Album-artist-link"
                        href={`/artists/${album.artist && album.artist.id}`}
                    >
                        {album.artist && album.artist.title}
                    </a>
                </h2>
                <FormatDisplay formats={album.formats} />
                <NodeMenu>
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
                    merge
                    move
                />
            </MinoRequest>
        </Page>
    );
}

export default AlbumShowPage;
