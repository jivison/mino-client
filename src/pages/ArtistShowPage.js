import React, { useState } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import Artist from "../models/Artist";
import Image from "../components/helpers/Image";
import AlbumArtistList from "../components/AlbumArtistList";
import ActionButtons from "../components/helpers/ActionButtons";

function ArtistShowPage() {
    const [artist, setArtist] = useState({});

    return (
        <Page title={"Artist"}>
            <MinoRequest
                modelAction={Artist.one}
                modelProps={[225]}
                setFunction={setArtist}
            >
                <Image src={artist.image_url} width="10vw" circle square />
                <h1 className="Artist-title">{artist.title}</h1>
                <AlbumArtistList albums={artist.albums} />
                <ActionButtons
                    model={Artist}
                    setFunction={setArtist}
                    entity={artist}
                    entityName="Artist"
                    editFields={["title", "image_url"]}
                    merge
                />
            </MinoRequest>
        </Page>
    );
}

export default ArtistShowPage;
