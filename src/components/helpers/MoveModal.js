import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import MinoRequest from "../../api/MinoRequest";
import Select from "react-select";
import Form from "./Form";
import FormField from "./FormField";
import "../../styles/helpers/MoveModal.sass";

function MoveModal({
    isOpen,
    closeModal,
    targetModel,
    entity,
    entityName,
    setFunction,
    callback = () => {}
}) {
    const [moveList, setMoveList] = useState([]);
    const [fakekey, setFakekey] = useState(Math.random());

    useEffect(() => {
        setFakekey(Math.random());
        return () => {};
    }, [entity]);

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
                            setFunction(response);
                            setFakekey(Math.random());
                            closeModal();
                            callback(response)
                        });
                    }}
                >
                    <div className="Dropdown-select">
                        <label htmlFor="target_id">Target</label>
                        <Select
                            autoFocus={true}
                            className="MoveModal-dropdown"
                            isSearchable={true}
                            name="target_id"
                            options={moveList.map && moveList.map(artist => {
                                return {
                                    value: artist.id,
                                    label: artist.title
                                };
                            })}
                        ></Select>
                    </div>
                    <FormField submit title={`Move ${entityName}s`} />
                </Form>
            </Modal>
        </MinoRequest>
    );
}

export default MoveModal;
