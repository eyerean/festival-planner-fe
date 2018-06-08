// @flow
import React from 'react';
import { Modal } from 'react-bootstrap';
import { DynamicForm } from 'modules/app/components';
import { Button } from 'shared';

const CreateFestModal = ({
  show,
  onClose,
  fields,
  requiredFields,
  invalidFields,
  handleChange,
  onSubmit,
  disabledBtn,
}) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Create New Festival</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <DynamicForm
        fields={fields}
        requiredFields={requiredFields}
        invalidFields={invalidFields}
        handleChange={handleChange}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onClose} style={{ marginRight: 20 }}>
        Close
      </Button>
      <Button primary type="submit" onClick={onSubmit} disabled={disabledBtn}>
        Create Festival
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CreateFestModal;
