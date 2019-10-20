import React, { useState } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import Artist from "../models/Artist";
import Album from "../models/Album";
import CardList from "../components/helpers/CardList";
import Card from "../components/helpers/Card";

function IndexPage() {
    const [entities, setEntities] = useState([]);
    const [model, setModel] = useState(Artist);

    return (
        <Page title="Collection">
            <MinoRequest setFunction={setEntities} modelAction={model.all}>
                <CardList letterBar letterSeps useIdAsLetter>
                    {entities.map(entity => {
                        return (
                            <Card id={entity.title} key={entity.id} image={entity.image_url} title={entity.title}>
                                
                            </Card>
                        );
                    })}
                </CardList>
            </MinoRequest>
        </Page>
    );
}

export default IndexPage;
