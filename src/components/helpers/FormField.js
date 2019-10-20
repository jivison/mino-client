import React from "react";
import "../../styles/helpers/FormField.sass"

function FormField({
    title,
    name,
    defaultValue = "",
    type = "text",
    submit = false,
    min = null
}) {
    return submit ? (
        <input type="submit" className="button submit-button" value={title || name} />
    ) : (
        <div className="FormField">
            {type !== "hidden" && <label>{title}</label>}

            {type === "textarea" ? (
                <textarea
                    name={name}
                    placeholder={title}
                    defaultValue={defaultValue}
                ></textarea>
            ) : type === "hidden" ? (
                <input
                    readOnly
                    style={{ display: "none" }}
                    name={name}
                    value={defaultValue}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    placeholder={title}
                    defaultValue={defaultValue}
                    min={min}
                />
            )}
        </div>
    );
}

export default FormField;
