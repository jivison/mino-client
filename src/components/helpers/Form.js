import React from "react";

function Form({
    submitHandler = function() {},
    fields = [],
    title = "",
    children
}) {
    const onSubmit = event => {
        event.preventDefault();

        let fd = new FormData(event.target);
        let data = {};
        for (let field of fields) {
            data[field] = fd.get(field);
        }
        submitHandler(data);
    };

    return (
        <form onSubmit={onSubmit} className="Form">
            <h1 className="form-title">{title}</h1>
            {children}
        </form>
    );
}

export default Form;
