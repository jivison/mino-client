import React, { useState } from "react";
import CardList from "./helpers/CardList";
import Card from "./helpers/Card";
import Formatting from "../models/Formatting";
import AddFormat from "./AddFormat";
import { humanize } from "../helpers";

const icons = {
    youtube: <i key="Youtube" title="Youtube" className="fab fa-youtube"></i>,
    spotify: <i key="Spotify" title="Spotify" className="fab fa-spotify"></i>,
    // The vinyl (and only this one) is not showing up [definitely a fa problem]
    // "vinyl"                 : <i title="Vinyl" className="fas fa-record-vinyl"></i>,
    vinyl: <i key="Vinyl" title="Vinyl" className="fas fa-compact-disc"></i>,
    cd: <i key="CD" title="CD" className="fas fa-compact-disc"></i>,
    digital_playlist: (
        <i
            key="Digital Playlist"
            title="Digital Playlist"
            className="fas fa-file-audio"
        ></i>
    ),
    unknown: <i key="Unknown" title="Unknown" className="fas fa-question"></i>
};

function FormatCardList({ formats, trackId, setFakekey }) {
    const [formatsState, setFormatsState] = useState(formats);

    const removeFormat = event => {
        event.persist();
        let formatName = event.currentTarget.closest(".FormatCard").id;
        console.log(trackId, formatName);
        Formatting.destroy(trackId, formatName).then(response => {
            setFakekey(Math.random());
            setFormatsState(
                formatsState.filter(format => {
                    return format !== formatName;
                })
            );
        });
    };

    return (
        <div className="FormatCardList">
            <CardList
                emptyMessage=""
                cards={formatsState.map(format => {
                    return (
                        <React.Fragment key={Math.random()}>
                            <Card
                                className="FormatCard"
                                nohover
                                id={format}
                                title={
                                    <>
                                        <span className="FormatCard-title">
                                            {humanize(format)}{" "}
                                            <span className="FormatCard-icon">
                                                {icons[format] ||
                                                    icons["unknown"]}
                                            </span>
                                        </span>
                                        <span
                                            className="FormatCard-remove"
                                            onClick={removeFormat}
                                            value={format}
                                        >
                                            <i className="fas fa-times"></i>
                                        </span>
                                    </>
                                }
                            />
                        </React.Fragment>
                    );
                })}
            >
                <h1 className="FormatCardList-title">Formats</h1>
            </CardList>
            <AddFormat
                trackId={trackId}
                setFormats={setFormatsState}
                formats={formatsState}
                setFakekey={setFakekey}
            />
        </div>
    );
}

export default FormatCardList;
