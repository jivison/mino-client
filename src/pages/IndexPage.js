import React, { useState } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import Artist from "../models/Artist";
import Album from "../models/Album";
import CardList from "../components/helpers/CardList";
import Card from "../components/helpers/Card";
import Track from "../models/Track";
import DropdownMenu from "../components/helpers/DropdownMenu";
import FormatDisplay from "../components/helpers/FormatDisplay";
import NodeMenu from "../components/helpers/NodeMenu";

function IndexPage() {
    const [entities, setEntities] = useState([]);
    const [model, setModel] = useState(Artist);

    return (
        <Page title="Collection">
            <MinoRequest setFunction={setEntities} modelAction={model.all}>
                <CardList
                    letterBar
                    letterSeps
                    useIdAsLetter
                    cards={entities.map(entity => {
                        return (
                            <Card
                                id={entity.sort_title}
                                key={entity.id}
                                image={
                                    entity.image_url || entity.album.image_url
                                }
                                circularImage={model.endpoint !== "albums"}
                                title={
                                    <>
                                        {entity.title}
                                        <FormatDisplay
                                            formats={entity.formats}
                                        />
                                    </>
                                }
                                subtitle={entity.artist && entity.artist.title}
                                clickHandler={() => {
                                    window.location.href = `/${model.endpoint}/${entity.id}`;
                                }}
                            ></Card>
                        );
                    })}
                >
                    <h1 className="count-title">
                        Your{" "}
                        {model.endpoint.charAt(0).toUpperCase() +
                            model.endpoint
                                .split("")
                                .splice(1)
                                .join("")}{" "}
                        <span className="subtitle">{entities.length}</span>
                    </h1>
                    <NodeMenu initialPrompt="Change View ⭘">
                        <p
                            className="option"
                            onClick={() => {
                                setModel(Artist);
                            }}
                        >
                            Artists
                        </p>
                        <p
                            className="option"
                            onClick={() => {
                                setModel(Album);
                            }}
                        >
                            Albums
                        </p>
                        <p
                            className="option"
                            onClick={() => {
                                setModel(Track);
                            }}
                        >
                            Tracks
                        </p>
                    </NodeMenu>
                </CardList>
            </MinoRequest>
        </Page>
    );
}

export default IndexPage;
