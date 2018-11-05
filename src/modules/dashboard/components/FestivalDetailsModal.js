import React from 'react';
import { Modal } from 'react-bootstrap';

const FestivalDetailsModal = ({ show, onClose, festival }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>{festival.name} Info</Modal.Title>
    </Modal.Header>
    <Modal.Body>details here in pretty format</Modal.Body>
  </Modal>
);

export default FestivalDetailsModal;
