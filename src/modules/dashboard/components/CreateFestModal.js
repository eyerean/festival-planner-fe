import React from 'react';
import {Modal, FormGroup, ControlLabel} from 'react-bootstrap';
import { Field } from 'redux-form';
import Datetime from 'react-datetime';
import {Button, ErrorText} from '../../../shared';

const Input = ({input, type, step, meta: {touched, error, warning}}) => {
  return (
  <div>
    <input {...input} type={type} step={step} className="form-control"/>
    {touched && error && <ErrorText>{error}</ErrorText>}
  </div>
);
}

const CreateFestModal = ({show, onClose, onSubmit, error, submitting}) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Create New Festival</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        <FormGroup controlId="name" validationState={error && error.name && 'error'}>
          <ControlLabel>Festival Name</ControlLabel>
          <Field
            name="name"
            component={Input}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="startDate" validationState={error && error.name && 'error'}>
          <ControlLabel>Starting Date</ControlLabel>
          {/*<Field
            name="startDate"
            component={Input}
            type="text"
          />*/}
          <Datetime 
            closeOnSelect
            dateFormat="DD-MM-YYYY"
            timeFormat={false}
          />
        </FormGroup>
        <FormGroup controlId="endDate" validationState={error && error.name && 'error'}>
          <ControlLabel>Ending Date</ControlLabel>
          {/*<Field
            name="endDate"
            component={Input}
            type="text"
          />*/}
          <Datetime 
            closeOnSelect
            dateFormat="DD-MM-YYYY"
            timeFormat={false}
          />
        </FormGroup>
        <FormGroup controlId="desc">
          <ControlLabel>Description</ControlLabel>
          <Field
            name="desc"
            component="textarea"
            className="form-control"
            style={{height: 70, resize: 'none'}}
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
        // disabled + show spinner when loading
        // when post complete close the modal and refetch
      >
        Create Festival
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CreateFestModal;
