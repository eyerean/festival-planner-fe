import React from 'react';
import styled from 'styled-components';
import { Modal, Row, Col } from 'react-bootstrap';
import _map from 'lodash/map';
import _omit from 'lodash/omit';
import _upperFirst from 'lodash/upperFirst';
import { Button } from 'shared';

const FestivalDetailsModal = ({ show, onClose, festival, onDetailsClick }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>{festival.name} Overview</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ModalBodyWrapper>
        {_map(_omit(festival, ['_id', '__v']), (value, key) => (
          <Row key={key}>
            <Col md={4}>
              {`${_upperFirst(key)
                .split(/(?=[A-Z])/)
                .join(' ')}:`}
            </Col>
            <Col md={8}>{value}</Col>
          </Row>
        ))}
      </ModalBodyWrapper>
    </Modal.Body>
    <Modal.Footer>
      <ButtonWrapper>
        <Button primary onClick={onDetailsClick}>
          Got to festival details
        </Button>
      </ButtonWrapper>
    </Modal.Footer>
  </Modal>
);

export default FestivalDetailsModal;

const ModalBodyWrapper = styled.div`
  padding: 10px 15px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;
