import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import TrackShow from "../TrackShow";

function TrackList({
    tracks,
    editable = false,
    artist = {},
    setTracks = () => {}
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="TrackList">
            {tracks.map((track, index) => {
                return (
                    <p>
                        <span className="subtitle">{index + 1}</span>{" "}
                        {track.title}
                        {editable && (
                            <button onClick={openModal} className="no-button">
                                Details
                            </button>
                        )}
                        {editable && (
                            <Modal
                                isOpen={isModalOpen}
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
                                />
                            </Modal>
                        )}
                    </p>
                );
            })}
        </div>
    );
}

TrackList.propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.object)
};

export default TrackList;
