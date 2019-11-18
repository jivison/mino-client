import React, { useState, useEffect } from "react";
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
    AdditionShowPage,
    InsightsPage,
    SigninPage,
    SignupPage
} from "./pages";
import Navbar from "./pages/Navbar";
import Favicon from "react-favicon";
import favicon from "./assets/logo-small.ico";
import User from "./models/User";
import AuthRoute from "./AuthRoute";

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [signInErrors, setSignInErorrs] = useState([]);
    const [signUpErrors, setSignUpErrors] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            setCurrentUser(localStorage.getItem("currentUser"));
        } else {
            User.current().then(response => {
                setCurrentUser(response);
            });
        }
        return () => {};
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "currentUser",
            typeof currentUser !== "string"
                ? JSON.stringify(currentUser)
                : currentUser
        );
        return () => {};
    }, [currentUser]);

    const signOut = () => {
        User.signout().then(() => {
            setCurrentUser("{}");
        });
    };

    const signIn = credentials => {
        User.signin(credentials).then(response => {
            if (response.errors) {
                setSignInErorrs(response.errors);
            } else {
                setCurrentUser(response);
                window.location.href = "/collection";
            }
        });
    };

    const signUp = data => {
        User.signup(data).then(response => {
            if (response.errors) {
                console.log(response);
                setSignUpErrors(response.errors);
            } else {
                setCurrentUser(response);
                window.location.href = "/collection";
            }
        });
    };

    let adjustedCurrentUser = !["null", "{}"].includes(currentUser)
        ? currentUser
        : "";

    return (
        <div className="App">
            <Favicon url={favicon} />
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
                rel="stylesheet"
            ></link>

            <Router>
                <Navbar
                    currentUser={adjustedCurrentUser}
                    signOutHandler={signOut}
                />
                <Switch>
                    <Route exact path="/" component={WelcomePage} />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/collection"
                        component={IndexPage}
                    />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/collection/artists/:id"
                        component={ArtistShowPage}
                    />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/collection/albums/:id"
                        component={AlbumShowPage}
                    />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/export"
                        component={ExportPage}
                    />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/generate"
                        component={ExternalPlaylistPage}
                    />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/seed"
                        component={SeedPage}
                    />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/maps/artist"
                        component={ArtistMapsPage}
                    />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/maps/album"
                        component={AlbumMapsPage}
                    />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/maps/artist/:id"
                        component={ArtistMapShowPage}
                    />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/maps/album/:id"
                        component={AlbumMapShowPage}
                    />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/additions"
                        component={AdditionsPage}
                    />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/additions/:id"
                        component={AdditionShowPage}
                    />
                    <AuthRoute
                        currentUser={adjustedCurrentUser}
                        exact
                        path="/insights"
                        component={InsightsPage}
                    />
                    <Route
                        exact
                        path="/signin"
                        render={() => (
                            <SigninPage
                                handleSignIn={signIn}
                                errors={signInErrors}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/signup"
                        render={() => (
                            <SignupPage
                                handleSignUp={signUp}
                                errors={signUpErrors}
                            />
                        )}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
