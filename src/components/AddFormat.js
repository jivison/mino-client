import React from "react";
import Form from "./helpers/Form";
import FormField from "./helpers/FormField";
import Formatting from "../models/Formatting";

function AddFormat({ trackId, setFormats, formats, setFakekey }) {
    const addFormat = data => {
        Formatting.create(trackId, data).then(response => {
            setFormats([...formats, response.format.name]);
            setFakekey(Math.random())
        });
    };

    return (
        <Form fields={["format"]} submitHandler={addFormat} reset>
            <FormField
                title="Add a format?"
                placeholder="eg. Youtube, CD, etc..."
                name="format"
            />
            <FormField submit title="Add Format!" />
        </Form>
    );
}

export default AddFormat;
