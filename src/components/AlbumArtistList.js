import React from "react";
import PropTypes from "prop-types";
import TrackList from "./helpers/TrackList";
import Card from "./helpers/Card";

function AlbumArtistList({ albums, history }) {
    return (
        <div className="AlbumArtistList">
            {albums.map(album => {
                return (
                    <React.Fragment key={Math.random()}>
                        <Card
                            fakekey={Math.random()}
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
                    </React.Fragment>
                );
            })}
        </div>
    );
}

AlbumArtistList.propTypes = {
    albums: PropTypes.array
};

export default AlbumArtistList;
