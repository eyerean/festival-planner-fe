import React from 'react';
import { Modal } from 'react-bootstrap';
import { DynamicForm, Button, ErrorText } from 'shared';

const CreateFestModal = ({
  show,
  onClose,
  fields,
  requiredFields,
  invalidFields,
  handleChange,
  onSubmit,
  disabledBtn,
  errorText,
}) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Create New Festival</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {fields.length > 0 && (
        <DynamicForm
          fields={fields}
          requiredFields={requiredFields}
          invalidFields={invalidFields}
          handleChange={handleChange}
        />
      )}
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onClose} style={{ marginRight: 20 }}>
        Close
      </Button>
      <Button primary onClick={onSubmit} disabled={disabledBtn}>
        Create Festival
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CreateFestModal;
