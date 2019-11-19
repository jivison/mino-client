import React, { useState } from "react";
import Page from "./Page";
import Form from "../components/helpers/Form";
import FormField from "../components/helpers/FormField";
import Addition from "../models/Addition";
import "../styles/pages/SeedPage.sass";

const renderFields = {
    none: {
        label: "Select one...",
        title: "Add something to your collection",
        format: "none",
        renderable: <></>,
        fields: []
    },
    youtube: {
        label: "Youtube",
        title: "Add a youtube playlist to your collection",
        format: "youtube",
        renderable: (
            <FormField
                id="dynamic-input"
                title="Playlist ID"
                name="playlistId"
            />
        ),
        fields: ["playlistId"]
    },
    spotify: {
        label: "Spotify",
        title: "Add a spotify playlist to your collection",
        format: "spotify",
        renderable: (
            <FormField
                id="dynamic-input"
                title="Playlist ID"
                name="playlistId"
            />
        ),
        fields: ["playlistId"]
    },
    vinyl: {
        label: "Vinyl",
        title: "Add a vinyl to your collection",
        format: "vinyl",
        renderable: (
            <div id="dynamic-input">
                <p className="vinyl-seed-description">
                    You can fill out as many of the below fields as you want.
                    The more fields you add, the more accurate the search.{" "}
                    <br />
                    Usually just artist and album is sufficient.
                </p>
                <FormField
                    title="Title"
                    name="album"
                    placeholder="eg. Revolver"
                />
                <FormField
                    title="Artist"
                    name="artist"
                    placeholder="eg. The Beatles"
                />
                <FormField
                    title="Barcode"
                    name="barcode"
                    placeholder="eg. 094638241713"
                />
                <FormField
                    title="Catalog №"
                    name="catno"
                    placeholder="eg. PMC 7009"
                />
                <FormField
                    title="Year"
                    name="year"
                    type="number"
                    min={0}
                    placeholder="1966"
                />
            </div>
        ),
        fields: ["album", "artist", "barcode", "catno", "year"]
    }
};

function SeedPage({ history }) {
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");
    const [formTitle, setFormTitle] = useState(
        "Add something to your collection"
    );
    const [fields, setFields] = useState([]);
    const [renderable, setRenderable] = useState(<></>);
    const [displayForm, setDisplayForm] = useState(true);
    const [messages, setMessages] = useState("");

    const changeForm = event => {
        let dynamic = renderFields[event.currentTarget.value];
        setRenderable(dynamic.renderable);
        setFields(dynamic.fields);
        setFormTitle(dynamic.title);
    };

    const submitHandler = data => {
        let format = data.format;
        let options = Object.keys(data)
            .filter(key => key !== "format")
            .reduce((acc, key) => {
                if (data[key]) {
                    acc[key] = data[key];
                }
                return acc;
            }, {});
        setLoading(true);
        setLoadingMessage("Seeding your collection. This may take awhile...");
        Addition.create({
            format: format,
            options: JSON.stringify(options)
        }).then(response => {
            setDisplayForm(false);
            setLoading(false);
            setMessages(response.errors || response.messages);
        });
    };

    return (
        <Page
            title="Seed"
            loadingMessage={loadingMessage}
            loadingOverlay={true}
            isLoading={loading}
        >
            {displayForm && (
                <Form
                    title={formTitle}
                    fields={[...fields, "format"]}
                    submitHandler={submitHandler}
                >
                    <select
                        onChange={changeForm}
                        name="format"
                        className="SeedPage-select"
                    >
                        {Object.keys(renderFields).map(field => {
                            return (
                                <option value={field} key={field}>
                                    {renderFields[field].label}
                                </option>
                            );
                        })}
                    </select>

                    <div className="Form-dynamic">
                        {renderable}
                        {renderable.props.id && (
                            <FormField submit title="Seed!" />
                        )}
                    </div>
                </Form>
            )}
            <p className="post-seed-description">{messages}</p>
        </Page>
    );
}

export default SeedPage;
