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
    children
}) {
    return (
        <p
            className={isOption ? "option" : ""}
            onClick={() => {
                if (onClickSetProps) {
                    modelProps = onClickSetProps();
                    if (modelProps) {
                        setLoadingMessage(loadingMessage);
                        post(
                            response => {
                                setFakekey(Math.random());
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
