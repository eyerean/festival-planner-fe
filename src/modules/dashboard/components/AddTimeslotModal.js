import React from 'react';
import moment from 'moment';
import { Modal, Row, Col } from 'react-bootstrap';
import _find from 'lodash/find';
import _map from 'lodash/map';
import { getTimeslotLabelFromTimeslotStart } from 'app/lib/helpers';
import { Button } from 'shared';

class AddTimeslotModal extends React.Component {
  render() {
    const { show, onClose, headData, bodyData, timeslot } = this.props;
    const lastTs = _find(bodyData, { timeslotOrder: bodyData.length - 1 });
    const newTSStart = moment(lastTs.timeslotStart, 'HH:mm')
      .add(timeslot.amount, timeslot.unit)
      .format('HH:mm');

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new timeslot to planner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <Row>
              <Col xs={4} />
              {_map(headData, day =>
                _map(day.stagesCols, stage => (
                  <Col xs={4} key={`${day.label} - ${stage.label}`}>
                    {`${day.label} - ${stage.label}`}
                  </Col>
                ))
              )}
            </Row>
            <Row>
              <Col xs={4}>{getTimeslotLabelFromTimeslotStart(newTSStart, timeslot)}</Col>
              {_map(headData, day =>
                _map(day.stagesCols, stage => (
                  <Col xs={4} key={`${day.label} - ${stage.label}`}>
                    <input type="text" placeholder="optional" />
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose} style={{ marginRight: 20 }}>
            Cancel
          </Button>
          <Button primary>Add timeslot</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddTimeslotModal;
