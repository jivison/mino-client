import React, { useState } from "react";
import EditModal from "./helpers/EditModal";
import Track from "../models/Track";
import MoveModal from "./helpers/MoveModal";
import FormatCardList from "./FormatCardList";
import TagCardList from "./TagCardList";
import "../styles/TrackShow.sass";

function TrackShow({ initialTrack, artist, setTracks, tracks, setFakekey }) {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [moveModalIsOpen, setMoveModalIsOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    const [track, setTrack] = useState(initialTrack);

    const openEditModal = () => {
        setEditModalIsOpen(true);
    };
    const closeEditModal = () => {
        setEditModalIsOpen(false);
    };

    const openMoveModal = () => {
        setMoveModalIsOpen(true);
    };
    const closeMoveModal = () => {
        setMoveModalIsOpen(false);
    };

    const deleteTrack = id => {
        Track.destroy(id).then(response => {
            setTracks(
                tracks.filter(track => {
                    return track.id !== response.id;
                })
            );
        });
    };

    return (
        <div>
            <h1 className="TrackShow-title">
                <span className="TrackShow-id">№ {track.id}: </span>
                {track.title}{" "}
                <span className="TrackShow-subtitle">by {artist.title}</span>
            </h1>
            <div className="TrackShow-card-deck">
                <FormatCardList
                    formats={track.formats}
                    trackId={track.id}
                    setFakekey={setFakekey}
                />
                <TagCardList
                    tags={track.tags}
                    trackId={track.id}
                    setFakekey={setFakekey}
                />
            </div>

            <button
                className="delete button"
                onClick={() => {
                    deleteTrack(track.id);
                }}
            >
                Delete
            </button>

            <button className="edit button" onClick={openEditModal}>
                Edit
            </button>

            <EditModal
                isOpen={editModalIsOpen}
                closeModal={closeEditModal}
                entityName="Track"
                fields={["title"]}
                submitHandler={data =>
                    Track.update(track.id, data).then(response => {
                        if (response.errors) {
                            setErrors(response.errors);
                        } else {
                            setTrack(response);
                            let updatedTracks = tracks.map(track => {
                                if (track.id === response.id) {
                                    return response;
                                } else {
                                    return track;
                                }
                            });
                            setTracks(updatedTracks);
                            closeEditModal();
                        }
                    })
                }
                entity={track}
                errors={errors}
            />
            <button className="move button" onClick={openMoveModal}>
                Move
            </button>
            <MoveModal
                isOpen={moveModalIsOpen}
                closeModal={closeMoveModal}
                targetModel={Track}
                entity={track}
                entityName="Track"
                setFunction={setTrack}
            />
        </div>
    );
}

export default TrackShow;
