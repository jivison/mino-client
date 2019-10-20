import React from "react";
import PropTypes from "prop-types";
import Image from "./helpers/Image";
import TrackList from "./helpers/TrackList";
import Card from "./helpers/Card";

function AlbumArtistList({ albums }) {
    return (
        <div className="AlbumArtistList">
            {albums.map(album => {
                return (
                    <Card
                        className="Album"
                        image={album.image_url}
                        circularImage={false}
                        title={album.title}
                        clickHandler={() => {
                            window.location.href = `/albums/${album.id}`;
                        }}
                    >
                        <TrackList tracks={album.tracks} />
                    </Card>
                );
            })}
        </div>
    );
}

AlbumArtistList.propTypes = {
    albums: PropTypes.array
};

export default AlbumArtistList;
