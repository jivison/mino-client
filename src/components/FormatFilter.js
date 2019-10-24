import React from "react";
import "../styles/FormatFilter.sass"

function FormatFilter({ entities, setFunction }) {
    const filterEntities = () => {
        let format = document.getElementById("FormatFilter-select").value;
        if (format !== "nofilter") {
            setFunction(
                entities.filter(entity => {
                    return entity.formats.includes(format);
                })
            );
        } else {
            setFunction(entities)
        }
    };

    let formats = [
        ...new Set(
            entities
                .map(entity => {
                    return entity.formats;
                })
                .flat()
        )
    ];

    return (
        <select id="FormatFilter-select" className="FormatFilter" onChange={filterEntities}>
            <option value="nofilter">Filter...</option>
            {formats.map(format => {
                return (
                    <option value={format}>
                        {format.charAt(0).toUpperCase() +
                            format
                                .split("")
                                .slice(1)
                                .join("")}
                    </option>
                );
            })}
        </select>
    );
}

export default FormatFilter;
