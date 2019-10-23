import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function MinoRequest({
    modelAction,
    modelProps = [],
    setFunction,
    noLoading,
    children,
    part,
    fakekey = ""
}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        modelAction(...modelProps).then(data => {
            if (part) {
                setFunction(data[part])
            } else {
                setFunction(data);
            }
            setLoading(false);
        });

        return () => {};
    }, [modelAction, fakekey]);

    return loading ? (
        !noLoading ? (
            "Loading..."
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
