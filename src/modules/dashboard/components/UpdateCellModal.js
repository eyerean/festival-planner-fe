import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { Button } from 'shared';

const UpdateCellModal = ({ show, onClose, cell, onSubmitChanges }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Update {cell.cellType}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ModalBodyWrapper>
        <p>{cell.label}</p>
        {/*
          @TODO: make fields for dynamic form according to cell
        */}
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
