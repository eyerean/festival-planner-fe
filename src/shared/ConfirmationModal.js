import React from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { Button } from 'shared';

const ConfirmationModal = ({ show, onClose, text, onConfirmClick }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirmation needed</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ModalBodyWrapper>
        <p>{text}</p>
      </ModalBodyWrapper>
    </Modal.Body>
    <Modal.Footer>
      <ButtonWrapper>
        <Button primary onClick={onConfirmClick}>
          Confirm
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ButtonWrapper>
    </Modal.Footer>
  </Modal>
);

export default ConfirmationModal;

const ModalBodyWrapper = styled.div`
  padding: 10px 15px;
`;

const ButtonWrapper = styled.div`
  text-align: center;

  > button {
    margin: 0 10px;
  }
`;
