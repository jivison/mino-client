import React, { useState } from "react";
import CardList from "./helpers/CardList";
import Card from "./helpers/Card";
import Tagging from "../models/Tagging";
import AddTag from "./AddTag";
import { humanize } from "../helpers";

function TagCardList({ tags, trackId, setFakekey }) {
    const [tagsState, setTagsState] = useState(tags);

    const removeTag = event => {
        event.persist();
        let tagName = event.currentTarget.closest(".TagCard").id;
        Tagging.destroy(trackId, tagName);
        setFakekey(Math.random())
        setTagsState(
            tagsState.filter(tag => {
                return tag !== tagName;
            })
        );
    };

    return (
        <div className="TagCardList">
            <CardList
                cards={tagsState.map(tag => {
                    return (
                        <Card
                            className="TagCard"
                            nohover
                            id={tag}
                            title={
                                <>
                                    <span className="TagCard-title">
                                        {humanize(tag)}{" "}
                                    </span>
                                    <span
                                        className="TagCard-remove"
                                        onClick={removeTag}
                                        value={tag}
                                    >
                                        <i className="fas fa-times"></i>
                                    </span>
                                </>
                            }
                        ></Card>
                    );
                })}
            >
                <h1 className="TagCardList-title">Tags</h1>
            </CardList>
            <AddTag
                trackId={trackId}
                setTags={setTagsState}
                tags={tagsState}
                setFakekey={setFakekey}
            />
        </div>
    );
}

export default TagCardList;
