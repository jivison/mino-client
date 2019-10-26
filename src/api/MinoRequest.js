import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function MinoRequest({
    modelAction,
    modelProps = [],
    setFunction,
    noLoading,
    noReload = true,
    children,
    part,
    fakekey = ""
}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        !noReload && setLoading(true);
        modelAction(...modelProps).then(data => {
            if (part) {
                setFunction(data[part]);
            } else {
                setFunction(data);
            }
            setLoading(false);
        });

        return () => {};
    }, [modelAction, fakekey]);

    return loading ? (
        !noLoading ? (
            <p className="MinoRequest-loading">Loading...</p>
        ) : (
            ""
        )
    ) : (
        <div>{children}</div>
    );
}

MinoRequest.propTypes = {
    modelAction: PropTypes.func,
    setFunction: PropTypes.func,
    modelProps: PropTypes.array,
    noLoading: PropTypes.bool
};

export default MinoRequest;
