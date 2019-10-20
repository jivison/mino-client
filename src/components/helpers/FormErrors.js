import React from "react";

function FormErrors({ errors = [] }) {
    return <div className="FormErrors">{errors.join(", ")}</div>;
}

export default FormErrors;
