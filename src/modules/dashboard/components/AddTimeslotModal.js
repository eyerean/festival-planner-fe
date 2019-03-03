import React from 'react';
import moment from 'moment';
import { Modal, Row, Col } from 'react-bootstrap';
import _find from 'lodash/find';
import _map from 'lodash/map';
import _forEach from 'lodash/forEach';
import _reject from 'lodash/reject';
import _concat from 'lodash/concat';
import { getTimeslotLabelFromTimeslotStart } from 'app/lib/helpers';
import { Button } from 'shared';

class AddTimeslotModal extends React.Component {
  constructor(props: Props) {
    super(props);
    const { bodyData, timeslot, headData } = props;

    const lastTs = _find(bodyData, { timeslotOrder: bodyData.length - 1 });

    const newArtists = [];
    _forEach(headData, day =>
      _forEach(day.stagesCols, stage => {
        newArtists.push({
          label: '',
          amountOfTimeslots: 1,
          stageOrder: stage.stageOrder,
          dayOrder: day.dayOrder,
        });
      })
    );

    this.state = {
      newTsStart: moment(lastTs.timeslotStart, 'HH:mm')
        .add(timeslot.amount, timeslot.unit)
        .format('HH:mm'),
      newBodyEntry: {},
      newArtistsEntry: newArtists,
    };
  }

  handleChange = (event, stage) => {
    const { newArtistsEntry } = this.state;
    const foundPreArt = _find(newArtistsEntry, { stageOrder: stage.stageOrder });
    let newArtist = {};

    if (foundPreArt) {
      // it will always get in this case
      newArtist = {
        ...foundPreArt,
        label: event.target.value,
      };
    } else {
      // failsafe
      newArtist = {
        label: event.target.value,
        amountOfTimeslots: 1,
        stageOrder: stage.stageOrder,
      };
    }

    this.setState(prevState => ({
      newArtistsEntry: _concat(
        _reject(prevState.newArtistsEntry, { stageOrder: stage.stageOrder }),
        newArtist
      ),
    }));
  };

  handleClick = () => {
    const { newArtistsEntry, newTsStart } = this.state;
    const { bodyData } = this.props;

    const bodyEntry = {
      artistsCols: newArtistsEntry,
      timeslotOrder: bodyData.length,
      timeslotStart: newTsStart,
    };

    this.props.onSubmitNewTSEntry(bodyEntry);
    this.props.onClose();
  };

  render() {
    const { show, onClose, headData, timeslot } = this.props;
    const { newTsStart } = this.state;

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
              <Col xs={4}>{getTimeslotLabelFromTimeslotStart(newTsStart, timeslot)}</Col>
              {_map(headData, day =>
                _map(day.stagesCols, stage => (
                  <Col xs={4} key={`${day.label} - ${stage.label}`}>
                    <input
                      type="text"
                      placeholder="optional"
                      onChange={e => {
                        this.handleChange(e, stage);
                      }}
                    />
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
          <Button primary onClick={this.handleClick}>
            Add timeslot
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddTimeslotModal;
