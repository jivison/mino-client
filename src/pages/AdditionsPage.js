import React, { useState, useEffect } from "react";
import Page from "./Page";
import MinoRequest from "../api/MinoRequest";
import Addition from "../models/Addition";
import CardList from "../components/helpers/CardList";
import Card from "../components/helpers/Card";
import "../styles/pages/AdditionsPage.sass";

function AdditionsPage({ history }) {
    const [originalAdditions, setOriginalAdditions] = useState([]);
    const [additions, setAdditions] = useState([]);
    const [showUnassociated, setShowUnassociated] = useState(false);

    useEffect(() => {
        setAdditions(
            originalAdditions.filter(addition => {
                return showUnassociated
                    ? true
                    : addition.humanized_type !== "Unassociated add";
            })
        );
        return () => {};
    }, [showUnassociated, originalAdditions]);

    return (
        <Page title="Additions">
            <MinoRequest
                modelAction={Addition.all}
                setFunction={setOriginalAdditions}
            >
                <CardList
                    cards={additions.map(addition => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <Card
                                    title={
                                        <span className="AdditionCard-titles">
                                            {addition.humanized_type}{" "}
                                            <span className="subtitle">
                                                {addition.id_string}
                                            </span>
                                        </span>
                                    }
                                    subtitle={`added ${addition.humanized_date} ago`}
                                    clickHandler={() => {
                                        history.push(
                                            `/additions/${addition.id}`
                                        );
                                    }}
                                />
                            </React.Fragment>
                        );
                    })}
                >
                    <button
                        className="button"
                        onClick={() => {
                            setShowUnassociated(!showUnassociated);
                        }}
                    >
                        Toggle unassociated adds
                    </button>
                </CardList>
            </MinoRequest>
        </Page>
    );
}

export default AdditionsPage;
