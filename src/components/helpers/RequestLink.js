import React from "react";
import post from "../../api/post";

function RequestLink({
    isOption = true,
    loadingMessage = "Loading...",
    setLoadingMessage = () => {},
    modelAction,
    modelProps = [],
    setLoading = () => {},
    setFakekey = () => {},
    onClickSetProps,
    className = "",
    callback = () => {},
    children
}) {
    return (
        <p
            className={(isOption ? "option" : "") + className}
            onClick={() => {
                if (onClickSetProps) {
                    modelProps = onClickSetProps();
                    if (modelProps) {
                        setLoadingMessage(loadingMessage);
                        post(
                            response => {
                                setFakekey(Math.random());
                                callback(response);
                            },
                            modelAction,
                            modelProps,
                            true,
                            setLoading
                        );
                    }
                } else {
                    setLoadingMessage(loadingMessage);
                    post(
                        response => {
                            setFakekey(Math.random());
                            callback(response);
                        },
                        modelAction,
                        modelProps,
                        true,
                        setLoading
                    );
                }
            }}
        >
            {children}
        </p>
    );
}

export default RequestLink;
