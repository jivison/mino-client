import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Form from "./Form";
import FormField from "./FormField";

Modal.setAppElement("#root");

function EditModal({
    children,
    isOpen,
    closeModal,
    entityName = "",
    fields = [],
    submitHandler = () => {},
    entity = {},
    errors = []
}) {
    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <button className="generic button" onClick={closeModal}>
                Close
            </button>
            <Form
                fields={[...fields, "create_map"]}
                title={`Edit ${entityName}`}
                submitHandler={submitHandler}
                errors={errors}
            >
                {fields.map(field => {
                    return (
                        <FormField
                            title={
                                field.charAt(0).toUpperCase() +
                                field
                                    .split("")
                                    .slice(1)
                                    .join("").split("_").join(" ")
                            }
                            name={field}
                            defaultValue={entity[field]}
                            type={field.includes("_url") ? "url" : "text"}
                        />
                    );
                })}
                <FormField name="create_map" type="hidden" defaultValue={true} />
                <FormField submit title={`Update ${entityName}`} />
            </Form>
        </Modal>
    );
}

export default EditModal;
