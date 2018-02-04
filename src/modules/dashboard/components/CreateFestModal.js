import React from 'react';
import {Modal, FormGroup, ControlLabel} from 'react-bootstrap';
import { Field } from 'redux-form';
import {Button, ErrorText} from '../../../shared';

const validationRequired = value => value ? undefined : 'Required field.';

const Input = ({input, type, step, meta: {touched, error, warning}}) => (
  <div>
    <input {...input} type={type} step={step} className="form-control"/>
    {touched && error && <ErrorText>{error}</ErrorText>}
  </div>
);

const CreateFestModal = ({show, onClose, onSubmit, error, submitting}) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Create New Festival</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        <FormGroup controlId="name" validationState={error && error.name && 'error'}>
          <ControlLabel>Festival name</ControlLabel>
          <Field
            name="name"
            component={Input}
            type="text"
            placeholder="Name"
            validate={validationRequired}
          />
        </FormGroup>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onClose} style={{marginRight: 20}}>Close</Button>
      <Button 
        primary
        type="submit"
        onClick={onSubmit}
        disabled={submitting}
      >
        Create Festival
      </Button>
    </Modal.Footer>
  </Modal>
);


export default CreateFestModal;