import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import MinoRequest from "../../api/MinoRequest";
import Select from "react-select";
import Form from "./Form";
import FormField from "./FormField";

function MoveModal({
    isOpen,
    closeModal,
    targetModel,
    entity,
    entityName,
    setFunction
}) {
    const [moveList, setMoveList] = useState([]);
    const [fakekey, setFakekey] = useState(Math.random());

    useEffect(() => {
        setFakekey(Math.random());
        return () => {};
    }, [entity]);

    console.log(moveList);

    return (
        <MinoRequest
            modelAction={targetModel.moveable}
            modelProps={[entity.id]}
            setFunction={setMoveList}
            noLoading={true}
            fakekey={fakekey}
        >
            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <button className="generic button" onClick={closeModal}>
                    Close
                </button>
                <Form
                    fields={["target_id"]}
                    title={`Move ${entityName}s`}
                    submitHandler={data => {
                        targetModel.move(entity.id, data).then(response => {
                            console.log(response);
                            setFunction(response);
                            setFakekey(Math.random());
                            closeModal();
                        });
                    }}
                >
                    <label htmlFor="target_id">Target</label>
                    <Select
                        autoFocus={true}
                        className="fancy-dropdown"
                        isSearchable={true}
                        name="target_id"
                        options={moveList.map(artist => {
                            return {
                                value: artist.id,
                                label: artist.title
                            };
                        })}
                    ></Select>
                    <FormField submit title="Move Artists" />
                </Form>
            </Modal>
        </MinoRequest>
    );
}

MoveModal.propTypes = {};

export default MoveModal;
