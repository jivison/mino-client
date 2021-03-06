import React, { useState } from "react";
import Page from "./Page";
import RequestLink from "../components/helpers/RequestLink";
import Creation from "../models/Creation";
import LostAndFound from "../components/LostAndFound";

function ExternalPlaylistPage() {
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");

    let urlParams = new URLSearchParams(
        window.location.hash.substr(1) // skip the first char (#)
    );

    const accessToken = urlParams.get("access_token");
    const [messages, setMessages] = useState();

    return (
        <Page
            title="Generate Playlist"
            loadingOverlay={true}
            isLoading={loading}
            loadingMessage={loadingMessage}
        >
            <h1 className="ExternalPlaylistPage-title">
                Generate A Spotify Playlist
            </h1>
            {!messages && (
                <>
                    <p className="description">
                        This will authenticate you with Spotifyand then attempt
                        to create a playlist with your collection.
                        <br />
                        The playlist will be called 'My Mino Collection'
                    </p>
                    <RequestLink
                        className="button"
                        isOption={false}
                        loadingMessage="Generating playlist, this may take awhile..."
                        setLoadingMessage={setLoadingMessage}
                        modelAction={Creation.create_spotify_playlist}
                        modelProps={[{ access_token: accessToken }]}
                        setLoading={setLoading}
                        callback={response => {
                            if (response.new_playlist) {
                                setMessages(
                                    <>
                                        <p className="new-playlist-description">
                                            Your playlist has been created!
                                            <br />
                                            <a
                                                className="new-playlist-link"
                                                href={
                                                    response.new_playlist
                                                        .external_urls.spotify
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {"View it on Spotify ↗"}
                                            </a>
                                        </p>
                                        <LostAndFound lost={response.lost_tracks} found={response.found_tracks} />
                                    </>
                                );
                            } else {
                                setMessages(
                                    <>
                                        <p className="errors">
                                            {response.errors}
                                        </p>
                                    </>
                                );
                            }
                        }}
                    >
                        Generate!
                    </RequestLink>
                </>
            )}
            <div className="ExternalPlaylistPage-messages">{messages}</div>
        </Page>
    );
}

export default ExternalPlaylistPage;
