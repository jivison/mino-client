import React, { useState } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import Image from "../components/helpers/Image";
import AlbumMap from "../models/AlbumMap";
import Album from "../models/Album";
import "../styles/pages/MapShowPage.sass";
import Modal from "react-modal";
import Form from "../components/helpers/Form";
import FormField from "../components/helpers/FormField";
import Card from "../components/helpers/Card";

function AlbumMapShowPage({ match, history }) {
    const [albumMaps, setAlbumMaps] = useState([]);
    const [album, setAlbum] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    const [currentValue, setCurrentValue] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deleteMap = event => {
        let albumMapId = parseInt(event.currentTarget.id);
        AlbumMap.destroy(albumMapId).then(response => {
            setAlbumMaps(
                albumMaps.filter(albumMap => {
                    return albumMap.id !== albumMapId;
                })
            );
        });
    };

    const albumId = match.params.id;

    console.log();
    console.log(album.title, albumMaps[0] && albumMaps[0].input);

    return (
        <Page title="Album Map">
            <MinoRequest
                modelAction={AlbumMap.show}
                modelProps={[albumId]}
                setFunction={setAlbumMaps}
            >
                <MinoRequest
                    modelAction={Album.one}
                    modelProps={[albumId]}
                    setFunction={setAlbum}
                    noLoading={true}
                >
                    <Image src={album.image_url} width="10vw" circle square />
                    <h1 className="Album-title">
                        <span
                            className="as-link"
                            onClick={() => {
                                history.push(`/collection/albums/${albumId}`);
                            }}
                        >
                            {album.title}
                        </span>
                        <span>&nbsp;Maps</span>
                        <button
                            className="AlbumMap-add button"
                            onClick={openModal}
                        >
                            Add Map
                        </button>
                    </h1>
                    <ul className="AlbumMap-list">
                        {albumMaps
                            .filter(albumMap => {
                                return albumMap.input !== album.title;
                            })
                            .map(albumMap => {
                                return (
                                    <li>
                                        ⮤ {albumMap.input}{" "}
                                        <span
                                            className="AlbumMap-remove"
                                            onClick={deleteMap}
                                            id={albumMap.id}
                                        >
                                            <i className="fas fa-times"></i>
                                        </span>
                                    </li>
                                );
                            })}
                    </ul>
                    <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                        <button className="generic button" onClick={closeModal}>
                            Close
                        </button>
                        <Form
                            title={`Add Map to ${album.title}`}
                            errors={errors}
                            fields={["input"]}
                            submitHandler={data => {
                                AlbumMap.create(
                                    Object.assign(data, {
                                        album_id: album.id,
                                        scope: album.artist_id
                                    })
                                ).then(response => {
                                    if (response.errors) {
                                        setErrors(response.errors);
                                    } else {
                                        setErrors([]);
                                        closeModal();
                                        setCurrentValue("");
                                        setAlbumMaps([...albumMaps, response]);
                                    }
                                });
                            }}
                        >
                            <FormField
                                title="Input"
                                name="input"
                                inputHandler={event => {
                                    setCurrentValue(
                                        event.currentTarget.querySelector(
                                            "input"
                                        ).value
                                    );
                                }}
                            />
                            <div className="FormField">
                                <label>Maps to</label>
                                <Card
                                    title={album.title}
                                    image={album.image_url}
                                    nohover
                                    border
                                    circularImage={false}
                                >
                                    {"⮤ "}
                                    {currentValue}
                                </Card>
                            </div>
                            <FormField submit title="Add Map!" />
                        </Form>
                    </Modal>
                </MinoRequest>
            </MinoRequest>
        </Page>
    );
}

export default AlbumMapShowPage;
