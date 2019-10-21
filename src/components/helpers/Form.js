import React from "react";
import "../../styles/helpers/Form.sass";
import FormErrors from "./FormErrors";

function Form({
    submitHandler = function() {},
    fields = [],
    title = "",
    errors = [],
    reset = false,
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
        reset && event.target.reset();
    };

    return (
        <form onSubmit={onSubmit} className="Form">
            <h1 className="form-title">{title}</h1>
            <div className="children">
                {errors && <FormErrors errors={errors} />}
                {children}
            </div>
        </form>
    );
}

export default Form;
