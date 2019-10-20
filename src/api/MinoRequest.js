import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function MinoRequest({ modelAction, setFunction, children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        modelAction().then(data => {
            setFunction(data);
            setLoading(false);
        });
        return () => {};
    }, []);

    return loading ? "Loading..." : <>{ children }</>;
}

MinoRequest.propTypes = {
    modelAction: PropTypes.func,
    setFunction: PropTypes.func
};

export default MinoRequest;
