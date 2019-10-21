import React from "react";
import "./styles/App.sass";
import WelcomePage from "./pages/WelcomePage";
import IndexPage from "./pages/IndexPage";
import ArtistShowPage from "./pages/ArtistShowPage";
import AlbumShowPage from "./pages/AlbumShowPage";

function App() {
    return (
        <div className="App">
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
                rel="stylesheet"
            ></link>
            {
                // <WelcomePage />
                // <IndexPage />
                // <ArtistShowPage />
                <AlbumShowPage />
            }
        </div>
    );
}

export default App;
