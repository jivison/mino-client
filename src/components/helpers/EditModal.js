import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Form from "./Form";
import FormField from "./FormField";
import FormErrors from "./FormErrors";

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
            <FormErrors errors={errors} />
            <Form
                fields={[...fields, "create_map"]}
                title={`Edit ${entityName}`}
                submitHandler={submitHandler}
            >
                {fields.map(field => {
                    return (
                        <FormField
                            title={
                                field.charAt(0).toUpperCase() +
                                field
                                    .split("")
                                    .slice(1)
                                    .join("")
                            }
                            name={field}
                            defaultValue={entity[field]}
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
