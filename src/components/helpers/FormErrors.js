import React from "react";

function FormErrors({ errors = [] }) {
    return <div className="FormErrors">
        {errors.map((error) => {
            return <p className="error">{error}</p>
        })}
    </div>;
}

export default FormErrors;
