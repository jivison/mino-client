import React from "react";
import { Redirect, Route } from "react-router-dom";

function AuthRoute({ exact = false, path, component, currentUser }) {
    if (currentUser) {
        return <Route exact={exact} path={path} component={component} />;
    } else {
        return (
            <Route path={path}>
                <Redirect to="/signin" />
            </Route>
        );
    }
}

export default AuthRoute;
