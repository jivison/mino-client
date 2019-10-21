import React, { useState } from "react";
import Page from "./Page";
import Creation from "../models/Creation";

function ExportPage() {
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");

    return (
        <Page
            loadingOverlay={true}
            isLoading={loading}
            loadingMessage={loadingMessage}
            title="Export"
        >
            <h1 className="ExportPage-title">Export Your Collection</h1>
            <p className="description">
                Your playlist will be downloaded as a CSV (which can be imported
                into Excel or Google Sheets). It has the following headers:
            </p>
            <ul className="headers-list">
                <li>title</li>
                <li>artist_title</li>
                <li>artist_id</li>
                <li>album_title</li>
                <li>album_id</li>
                <li>tags_names</li>
                <li>tags_ids</li>
                <li>formats_names</li>
                <li>formats_ids</li>
            </ul>
            <button
                className="download button"
                onClick={() => {
                    setLoadingMessage("Processing your data...");
                    setLoading(true);

                    Creation.download().then(blob => {
                        let a = document.createElement("a");
                        document.body.appendChild(a);
                        a.style = "display: none";
                        let url = window.URL.createObjectURL(blob);
                        a.href = url;
                        a.download = "mino_collection.csv";
                        a.click();
                        window.URL.revokeObjectURL(url);
                        setLoading(false)
                    });
                }}
            >
                Download
            </button>
        </Page>
    );
}

export default ExportPage;
