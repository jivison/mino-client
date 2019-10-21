function post(
    callback = () => {},
    modelAction,
    modelProps = [],
    useLoading = true,
    setLoading = () => {}
) {
    useLoading && setLoading(true);
    modelAction(...modelProps).then(response => {
        console.log(response);
        useLoading && setLoading(false);
        callback(response)
    });
}

export default post;
