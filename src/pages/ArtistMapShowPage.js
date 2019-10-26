import React, { useState } from "react";
import Page from "./Page";
import ArtistMap from "../models/ArtistMap";
import MinoRequest from "../api/MinoRequest";
import Artist from "../models/Artist";
import Image from "../components/helpers/Image";
import "../styles/pages/MapShowPage.sass";
import Card from "../components/helpers/Card";
import Modal from "react-modal";
import Form from "../components/helpers/Form";
import FormField from "../components/helpers/FormField";

function ArtistMapShowPage({ history, match }) {
    const [artistMaps, setArtistMaps] = useState([]);
    const [artist, setArtist] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState("");
    const [errors, setErrors] = useState([]);

    const deleteMap = event => {
        let artistMapId = parseInt(event.currentTarget.id);
        ArtistMap.destroy(artistMapId).then(response => {
            setArtistMaps(
                artistMaps.filter(artistMap => {
                    return artistMap.id !== artistMapId;
                })
            );
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const artistId = match.params.id;

    return (
        <Page title="Artist Map">
            <MinoRequest
                modelAction={ArtistMap.show}
                modelProps={[artistId]}
                setFunction={setArtistMaps}
            >
                <MinoRequest
                    modelAction={Artist.one}
                    modelProps={[artistId]}
                    setFunction={setArtist}
                    noLoading={true}
                >
                    <Image src={artist.image_url} width="10vw" height="10vw" circle square />
                    <h1 className="Artist-title">
                        <span
                            onClick={() => {
                                history.push(
                                    `/collection/artists/${artist.id}`
                                );
                            }}
                            className="as-link"
                        >
                            {artist.title}
                        </span>
                        <span>&nbsp;Maps</span>
                        <button
                            className="ArtistMap-add button"
                            onClick={openModal}
                        >
                            Add Map
                        </button>
                    </h1>
                    <ul className="ArtistMap-list">
                        {artistMaps
                            .filter(artistMap => {
                                return artistMap.input !== artist.title;
                            })
                            .map(artistMap => {
                                return (
                                    <li>
                                        ⮤ {artistMap.input}{" "}
                                        <span
                                            className="ArtistMap-remove"
                                            onClick={deleteMap}
                                            id={artistMap.id}
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
                            title={`Add Map to ${artist.title}`}
                            errors={errors}
                            fields={["input"]}
                            submitHandler={data => {
                                ArtistMap.create(
                                    Object.assign(data, {
                                        artist_id: artist.id
                                    })
                                ).then(response => {
                                    if (response.errors) {
                                        setErrors(response.errors);
                                    } else {
                                        setErrors([]);
                                        closeModal();
                                        setCurrentValue("");
                                        setArtistMaps([
                                            ...artistMaps,
                                            response
                                        ]);
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
                                    title={artist.title}
                                    image={artist.image_url}
                                    nohover
                                    border
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

export default ArtistMapShowPage;
