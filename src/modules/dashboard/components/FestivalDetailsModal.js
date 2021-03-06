import React from 'react';
import styled from 'styled-components';
import { Modal, Row, Col, Glyphicon } from 'react-bootstrap';
import _map from 'lodash/map';
import _omit from 'lodash/omit';
import _upperFirst from 'lodash/upperFirst';
import { Button } from 'shared';

const FestivalDetailsModal = ({ show, onClose, festival, onDetailsClick, onDeleteClick }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>{festival.name} Quick Overview</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ModalBodyWrapper>
        {_map(_omit(festival, ['_id', '__v', 'details']), (value, key) => (
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
          Go to festival details
        </Button>
        <GlyphiconButton error onClick={onDeleteClick}>
          <Glyphicon glyph="trash" />
        </GlyphiconButton>
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

const GlyphiconButton = styled(Button)`
  background: transparent;
  padding: 10px;
  min-width: 36px;
  height: 36px;
  float: right;
  border: none;
`;
