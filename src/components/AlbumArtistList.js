import React from "react";
import PropTypes from "prop-types";
import Image from "./helpers/Image";
import TrackList from "./helpers/TrackList";
import Card from "./helpers/Card";

function AlbumArtistList({ albums, history }) {
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
                            history.push(`/collection/albums/${album.id}`);
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
