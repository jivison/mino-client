import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import TrackShow from "../TrackShow";
import FormatDisplay from "./FormatDisplay";
import "../../styles/helpers/TrackList.sass";

function TrackList({
    tracks,
    editable = false,
    artist = {},
    setTracks = () => {},
    setFakekey = () => {}
}) {
    const [isModalOpen, setIsModalOpen] = useState(
        tracks.reduce((acc, track) => {
            acc[track.id] = false;
            return acc;
        }, {})
    );

    const openModal = trackId => {
        setIsModalOpen(
            tracks.reduce((acc, track) => {
                track.id === trackId
                    ? (acc[track.id] = true)
                    : (acc[track.id] = false);
                return acc;
            }, {})
        );
    };

    const closeModal = () => {
        // close every modal
        setIsModalOpen(
            tracks.reduce((acc, track) => {
                acc[track.id] = false;
                return acc;
            }, {})
        );
    };

    return (
        <div className="TrackList">
            {tracks.map((track, index) => {
                return (
                    <div className="TrackList-track" key={track.id}>
                        <div>
                            <span className="TrackList-count subtitle">
                                {index + 1}
                            </span>{" "}
                            <span className="TrackList-title">
                                {track.title}
                            </span>
                        </div>
                        <div className="TrackList-formats">
                            {!editable && (
                                <FormatDisplay formats={track.formats} />
                            )}
                            {editable && (
                                <>
                                    <FormatDisplay formats={track.formats} />
                                    <button
                                        onClick={() => {
                                            openModal(track.id);
                                        }}
                                        className="no-button"
                                    >
                                        Details
                                    </button>
                                </>
                            )}
                        </div>
                        {editable && (
                            <Modal
                                isOpen={isModalOpen[track.id]}
                                onRequestClose={closeModal}
                            >
                                <button
                                    className="generic button"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <TrackShow
                                    initialTrack={track}
                                    artist={artist}
                                    setTracks={setTracks}
                                    tracks={tracks}
                                    setFakekey={setFakekey}
                                />
                            </Modal>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

TrackList.propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.object)
};

export default TrackList;
