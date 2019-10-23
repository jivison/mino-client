import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/App.sass";
import {
    WelcomePage,
    IndexPage,
    ArtistShowPage,
    AlbumShowPage,
    ExportPage,
    ExternalPlaylistPage,
    ArtistMapsPage,
    AlbumMapsPage,
    ArtistMapShowPage,
    AlbumMapShowPage,
    SeedPage,
    AdditionsPage,
    AdditionShowPage
} from "./pages/pages";
import Navbar from "./pages/Navbar";

function App() {
    return (
        <div className="App">
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
                rel="stylesheet"
            ></link>

            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={WelcomePage} />
                    <Route exact path="/collection" component={IndexPage} />
                    <Route exact path="/collection/artists/:id" component={ArtistShowPage} />
                    <Route exact path="/collection/albums/:id" component={AlbumShowPage} />
                    <Route exact path="/export" component={ExportPage} />
                    <Route exact path="/generate" component={ExternalPlaylistPage} />
                    <Route exact path="/seed" component={SeedPage} />
                    <Route exact path="/maps/artist" component={ArtistMapsPage} />
                    <Route exact path="/maps/album" component={AlbumMapsPage} />
                    <Route exact path="/maps/artist/:id" component={ArtistMapShowPage} />
                    <Route exact path="/maps/album/:id" component={AlbumMapShowPage} /> 
                    <Route exact path="/additions" component={AdditionsPage} />
                    <Route exact path="/additions/:id" component={AdditionShowPage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
