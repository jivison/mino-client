import React, { useState, useEffect } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import Album from "../models/Album";
import Image from "../components/helpers/Image";
import ActionButtons from "../components/helpers/ActionButtons";
import TrackList from "../components/helpers/TrackList";

function AlbumShowPage() {
    const [album, setAlbum] = useState({});
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        setTracks(album.tracks);
        return () => {};
    }, [album]);

    return (
        <Page title="Album">
            <MinoRequest
                modelAction={Album.one}
                modelProps={[277]}
                setFunction={setAlbum}
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

                <TrackList
                    tracks={tracks}
                    editable
                    artist={album.artist}
                    setTracks={setTracks}
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
