import React from "react";
import "../../styles/helpers/FormatDisplay.sass"

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

function FormatDisplay({ formats }) {
    return (
        <div className="FormatDisplay">
            {formats.length === 0
                ? icons["unknown"]
                : formats
                      .sort()
                      .map(format =>
                          icons[format] ? (
                              icons[format]
                          ) : (
                              <i title={format} className="fas fa-question"></i>
                          )
                      )}
        </div>
    );
}

export default FormatDisplay;
