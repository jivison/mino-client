import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import MinoRequest from "../../api/MinoRequest";
import Select from "react-select";
import Form from "./Form";
import FormField from "./FormField";
import "../../styles/helpers/MergeModal.sass";

function MergeModal({
    isOpen,
    closeModal,
    targetModel,
    entity,
    entityName,
    history,
    mergeRedirectEndpoint,
    setFunction
}) {
    const [mergeList, setMergeList] = useState([]);
    const [fakekey, setFakekey] = useState(Math.random());

    useEffect(() => {
        setFakekey(Math.random());
    }, [entity]);

    return (
        <MinoRequest
            modelAction={targetModel.mergeable}
            modelProps={[entity.id]}
            setFunction={setMergeList}
            noLoading={true}
            fakekey={fakekey}
        >
            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <button className="generic button" onClick={closeModal}>
                    Close
                </button>
                <Form
                    fields={["target_id"]}
                    title={`Merge ${entityName}s`}
                    submitHandler={data => {
                        targetModel.merge(entity.id, data).then(response => {
                            closeModal();
                            history.push(
                                `/collection/${mergeRedirectEndpoint}/${response.id}`
                            );
                            setFunction(response)
                        });
                    }}
                >
                    <div className="Dropdown-select">
                        <label htmlFor="target_id">Target</label>
                        <Select
                            autoFocus={true}
                            className="MergeModal-dropdown"
                            isSearchable={true}
                            name="target_id"
                            options={mergeList.map(artist => {
                                return {
                                    value: artist.id,
                                    label: artist.title
                                };
                            })}
                        ></Select>
                    </div>
                    <FormField submit title={`Merge ${entityName}s`} />
                </Form>
            </Modal>
        </MinoRequest>
    );
}

export default MergeModal;
