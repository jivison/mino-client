import React from "react";
import Form from "./helpers/Form";
import FormField from "./helpers/FormField";
import Tagging from "../models/Tagging";

function AddTag({ trackId, setTags, tags, setFakekey }) {
    const addTag = data => {
        Tagging.create(trackId, {
            tags: data.tags.split(/ *, */)
        }).then(response => {
            setTags([
                ...tags,
                ...response.map(tagging => {
                    return tagging.tag.name;
                })
            ]);
            setFakekey(Math.random());
        });
    };

    return (
        <Form fields={["tags"]} submitHandler={addTag} reset>
            <FormField
                title="Add a tag?"
                placeholder="tag1, tag2, etc..."
                name="tags"
            />
            <FormField submit title="Add Tag!" />
        </Form>
    );
}

export default AddTag;
