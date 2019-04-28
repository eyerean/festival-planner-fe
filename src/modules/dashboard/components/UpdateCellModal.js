import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { Button, DynamicForm } from 'shared';
import { updateCellFields } from '../lib/fields';

const UpdateCellModal = ({ show, onClose, cell, fields, onSubmitChanges, onCellChange }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Update {cell.cellType}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ModalBodyWrapper>
        <DynamicForm
          fields={fields}
          requiredFields={[]}
          invalidFields={[]}
          handleChange={onCellChange}
        />
      </ModalBodyWrapper>
    </Modal.Body>
    <Modal.Footer>
      <ButtonWrapper>
        <Button primary onClick={onSubmitChanges}>
          Confirm
        </Button>
      </ButtonWrapper>
    </Modal.Footer>
  </Modal>
);

export default UpdateCellModal;

const ModalBodyWrapper = styled.div`
  padding: 10px 15px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;
