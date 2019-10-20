import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import MinoRequest from "../../api/MinoRequest";
import Select from "react-select";
import Form from "./Form";
import FormField from "./FormField";

function MergeModal({ isOpen, closeModal, targetModel, entity, entityName }) {
    const [mergeList, setMergeList] = useState([]);
    const [fakekey, setFakekey] = useState(Math.random())

    useEffect(
        () => {
            setFakekey(Math.random())   
        },
        [entity],
    )

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
                        targetModel.merge(entity.id, data).then((response) => {
                            closeModal()
                        });
                    }}
                >
                    <label htmlFor="target_id">Target</label>
                    <Select
                        autoFocus={true}
                        className="fancy-dropdown"
                        isSearchable={true}
                        name="target_id"
                        options={mergeList.map(artist => {
                            return {
                                value: artist.id,
                                label: artist.title
                            };
                        })}
                    ></Select>
                    <FormField submit title="Merge Artists" />
                </Form>
            </Modal>
        </MinoRequest>
    );
}

MergeModal.propTypes = {};

export default MergeModal;
