import React from "react";

function FormErrors({ errors = [] }) {
    return <div className="FormErrors">
        {errors.map((error) => {
            return <p key={Math.random()} className="error">{error}</p>
        })}
    </div>;
}

export default FormErrors;
