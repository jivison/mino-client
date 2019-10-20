import React, { useState } from "react";
import PropTypes from "prop-types";
import EditModal from "./EditModal";
import MergeModal from "./MergeModal";
import Artist from "../../models/Artist";
import MoveModal from "./MoveModal";

function ActionButtons({
    model,
    merge = false,
    move = false,
    editFields = [],
    entityName = "",
    entity = {},
    setFunction = () => {}
}) {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [mergeModalIsOpen, setMergeModalIsOpen] = useState(false);
    const [moveModalIsOpen, setMoveModalIsOpen] = useState(false);
    const [errors, setErrors] = useState([]);

    const openEditModal = () => {
        setEditModalIsOpen(true);
    };
    const closeEditModal = () => {
        setErrors([])
        setEditModalIsOpen(false);
    };

    const openMergeModal = () => {
        setMergeModalIsOpen(true);
    };
    const closeMergeModal = () => {
        setMergeModalIsOpen(false);
    };

    const openMoveModal = () => {
        setMoveModalIsOpen(true);
    };
    const closeMoveModal = () => {
        setMoveModalIsOpen(false);
    };

    return (
        <div className="CrudButtons">
            <button
                onClick={() => {
                    model.delete(entity.id).then(response => {
                        window.location.href = "/";
                    });
                }}
                className="delete button"
            >
                Delete
            </button>
            <button onClick={openEditModal} className="edit button">
                Edit
            </button>

            {merge && (
                <button onClick={openMergeModal} className="merge button">
                    Merge
                </button>
            )}

            {move && (
                <button onClick={openMoveModal} className="move button">
                    Move
                </button>
            )}

            {merge && (
                <MergeModal
                    isOpen={mergeModalIsOpen}
                    closeModal={closeMergeModal}
                    targetModel={model}
                    entity={entity}
                    entityName={entityName}
                />
            )}

            {move && (
                <MoveModal
                    isOpen={moveModalIsOpen}
                    closeModal={closeMoveModal}
                    targetModel={model}
                    entity={entity}
                    entityName={entityName}
                    setFunction={setFunction}
                />
            )}

            <EditModal
                isOpen={editModalIsOpen}
                closeModal={closeEditModal}
                fields={editFields}
                entityName={entityName}
                errors={errors}
                submitHandler={data =>
                    model.update(entity.id, data).then(response => {
                        if (response.errors) {
                            setErrors(response.errors);
                        } else {
                            setFunction(response);
                            closeEditModal();
                        }
                    })
                }
                entity={entity}
            />
        </div>
    );
}

ActionButtons.propTypes = {
    model: PropTypes.object,
    setFunction: PropTypes.func,
    entity: PropTypes.object,
    merge: PropTypes.bool,
    move: PropTypes.bool
};

export default ActionButtons;
