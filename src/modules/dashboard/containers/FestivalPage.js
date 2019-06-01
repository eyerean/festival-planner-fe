import React, { Fragment } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _flatten from 'lodash/flatten';
import _includes from 'lodash/includes';
import _without from 'lodash/without';
import { Button } from 'shared';
import { getTimeslotLabelFromTimeslotStart, handleDynamicFieldChange } from 'app/lib/helpers';
import { updateCellFields } from '../lib/fields';
import { mapObjectToFields } from '../lib/helpers';
import { UpdateCellModal } from '../components';

const headInitialData = [
  {
    label: 'saturday',
    dayOrder: 1,
    stagesCols: [
      {
        label: 'main stage',
        stageOrder: 1,
      },
      {
        label: 'stage abc',
        stageOrder: 2,
      },
    ],
  },
];

const bodyInitialData = [
  {
    timeslotOrder: 0,
    timeslotStart: '15:00',
    artistsCols: [
      {
        label: 'band A',
        amountOfTimeslots: 1,
        stageOrder: 1,
        dayOrder: 1,
      },
      {
        label: '-',
        amountOfTimeslots: 1,
        stageOrder: 2,
        dayOrder: 1,
      },
    ],
  },
  {
    timeslotOrder: 1,
    timeslotStart: '16:00',
    artistsCols: [
      {
        label: 'band ZZ',
        amountOfTimeslots: 2,
        stageOrder: 1,
        dayOrder: 1,
      },
      {
        label: 'famous band',
        amountOfTimeslots: 1,
        stageOrder: 2,
        dayOrder: 1,
      },
    ],
  },
  {
    timeslotOrder: 2,
    timeslotStart: '17:00',
    artistsCols: [
      {
        label: 'allochiria',
        amountOfTimeslots: 1,
        stageOrder: 2,
        dayOrder: 1,
      },
    ],
  },
];

class FestivalPage extends React.Component {
  state = {
    timeslot: { amount: 1, unit: 'h' }, // one hour by default
    headData: headInitialData,
    bodyData: bodyInitialData,
    selectedCell: undefined,
    cellFields: [],
    invalidCellFields: [],
  };

  handleAddTimeslot = () => {
    const { bodyData, timeslot } = this.state;

    const lastTs = _find(bodyData, { timeslotOrder: bodyData.length - 1 });

    const newTsStart = moment(lastTs.timeslotStart, 'HH:mm')
      .add(timeslot.amount, timeslot.unit)
      .format('HH:mm');

    // add empty cells for all artists all days all stages
    this.setState(prevState => ({
      bodyData: [
        ...prevState.bodyData,
        {
          timeslotOrder: prevState.bodyData.length,
          timeslotStart: newTsStart,
          artistsCols: _flatten(
            _map(prevState.headData, day =>
              _map(day.stagesCols, stage => ({
                label: '',
                amountOfTimeslots: 1,
                stageOrder: stage.stageOrder,
                dayOrder: day.dayOrder,
              }))
            )
          ),
        },
      ],
    }));
  };

  handleAddStage = () => {
    // add a stage to each existing day
    this.setState(prevState => ({
      headData: [
        ..._map(prevState.headData, day => ({
          ...day,
          stagesCols: [
            ...day.stagesCols,
            {
              label: `stage ${day.stagesCols.length + 1}`,
              stageOrder: day.stagesCols.length,
            },
          ],
        })),
      ],
      // add empty cells for artists
      bodyData: _map(prevState.bodyData, row => ({
        ...row,
        artistsCols: [
          ...row.artistsCols,
          ..._map(prevState.headData, day => ({
            label: '',
            amountOfTimeslots: 1,
            stageOrder: day.stagesCols.length,
            dayOrder: day.dayOrder,
          })),
        ],
      })),
    }));
  };

  handleAddDay = () => {
    const { headData } = this.state;
    const newDay = {
      label: `day ${headData.length + 1}`,
      dayOrder: headData.length + 1,
      // default the existing stages (if any)
      stagesCols: headData[0].stagesCols || [{ label: 'stage 1', stageOrder: 0 }],
    };

    this.setState(prevState => ({
      headData: [...prevState.headData, newDay],
      // add empty cells for artists
      bodyData: _map(prevState.bodyData, row => ({
        ...row,
        artistsCols: [
          ...row.artistsCols,
          ..._map(newDay.stagesCols, stage => ({
            label: '',
            amountOfTimeslots: 1,
            stageOrder: stage.stageOrder,
            dayOrder: newDay.dayOrder,
          })),
        ],
      })),
    }));
  };

  handleArtistUpdate = (artist, tsOrder) => () => {
    this.setState({
      selectedCell: { ...artist, cellType: 'artist', tsOrder },
      showUpdateModal: true,
      cellFields: mapObjectToFields(updateCellFields.artist, artist),
    });
  };

  handleDayUpdate = day => () => {
    this.setState({
      selectedCell: { ...day, cellType: 'day' },
      showUpdateModal: true,
      cellFields: mapObjectToFields(updateCellFields.day, day),
    });
  };

  handleStageUpdate = stage => () => {
    this.setState({
      selectedCell: { ...stage, cellType: 'stage' },
      showUpdateModal: true,
      cellFields: mapObjectToFields(updateCellFields.stage, stage),
    });
  };

  handleCloseUpdateCellModal = () => {
    this.setState({
      selectedCell: undefined,
      showUpdateModal: false,
    });
  };

  handleSubmitCellChanges = () => {
    const { selectedCell, cellFields } = this.state;
    switch (selectedCell.cellType) {
      case 'artist': //@TODO constants
        this.setState(prevState => ({
          selectedCell: undefined,
          showUpdateModal: false,
          bodyData: _map(
            prevState.bodyData,
            row =>
              row.timeslotOrder === prevState.selectedCell.tsOrder
                ? {
                    ...row,
                    artistsCols: _map(
                      row.artistsCols,
                      ar =>
                        ar.dayOrder === prevState.selectedCell.dayOrder &&
                        ar.stageOrder === prevState.selectedCell.stageOrder
                          ? {
                              ...ar,
                              label: _find(cellFields, { name: 'artistName' }).value,
                            }
                          : ar
                    ),
                  }
                : row
          ),
        }));
      case 'day':
        console.log('handleSubmitCellChanges DAY', this.state);

        this.setState(prevState => ({
          selectedCell: undefined,
          showUpdateModal: false,
          headData: _map(
            prevState.headData,
            day =>
              day.dayOrder === prevState.selectedCell.dayOrder
                ? {
                    ...day,
                    dayOrder: _find(cellFields, { name: 'dayOrder' }).value,
                    label: _find(cellFields, { name: 'dayName' }).value,
                  }
                : day
          ),
        }));
        break;
      case 'stage':
        console.log('handleSubmitCellChanges STAGE', this.state);

        break;
      default:
        break;
    }
  };

  handleCellUpdate = key => field => {
    this.setState((prevState: State) => ({
      cellFields: handleDynamicFieldChange(field, prevState.cellFields, key),
      invalidCellFields: _includes(prevState.invalidCellFields, field.name)
        ? _without(prevState.invalidCellFields, field.name)
        : prevState.invalidCellFields,
    }));
  };

  render() {
    const { headData, bodyData, timeslot, selectedCell, showUpdateModal, cellFields } = this.state;

    return (
      <Fragment>
        <Wrapper>
          <Table>
            <thead>
              <tr>
                <th>hours</th>
                {_map(headData, day => (
                  <HoverHeadCell
                    key={day.dayOrder}
                    colSpan={day.stagesCols.length || '1'}
                    onClick={this.handleDayUpdate(day)}
                  >
                    {day.label}
                  </HoverHeadCell>
                ))}

                <OverlayTrigger
                  overlay={<Tooltip id="add-day-tooltip">Add a day</Tooltip>}
                  placement="top"
                >
                  <ButtonCell>
                    <Button primary onClick={this.handleAddDay}>
                      <Glyphicon glyph="plus" />
                    </Button>
                  </ButtonCell>
                </OverlayTrigger>
              </tr>
              <SecondHeadRow>
                <OverlayTrigger
                  overlay={<Tooltip id="add-stage-tooltip">Add new stage per day</Tooltip>}
                  placement="left"
                >
                  <ButtonCell>
                    <Button primary onClick={this.handleAddStage}>
                      <Glyphicon glyph="plus" />
                    </Button>
                  </ButtonCell>
                </OverlayTrigger>
                {_map(headData, day =>
                  _map(day.stagesCols, stage => (
                    <HoverCell key={stage.stageOrder} onClick={this.handleStageUpdate(stage)}>
                      {stage.label}
                    </HoverCell>
                  ))
                )}
              </SecondHeadRow>
            </thead>
            <tbody>
              {_map(bodyData, row => (
                <tr key={row.timeslotOrder}>
                  <td>{getTimeslotLabelFromTimeslotStart(row.timeslotStart, timeslot)}</td>
                  {_map(row.artistsCols, artist => (
                    <HoverCell
                      selected={
                        selectedCell &&
                        selectedCell.dayOrder === artist.dayOrder &&
                        selectedCell.stageOrder === artist.stageOrder &&
                        selectedCell.label === artist.label
                      }
                      key={'d' + artist.dayOrder + 's' + artist.stageOrder}
                      rowSpan={artist.amountOfTimeslots || '1'}
                      onClick={this.handleArtistUpdate(artist, row.timeslotOrder)}
                    >
                      {artist.label}
                    </HoverCell>
                  ))}
                </tr>
              ))}
              <tr>
                <OverlayTrigger
                  overlay={<Tooltip id="add-timeslot-tooltip">Add timeslot</Tooltip>}
                  placement="left"
                >
                  <ButtonCell>
                    <Button primary onClick={this.handleAddTimeslot}>
                      <Glyphicon glyph="plus" />
                    </Button>
                  </ButtonCell>
                </OverlayTrigger>
              </tr>
            </tbody>
          </Table>
        </Wrapper>

        {showUpdateModal && (
          <UpdateCellModal
            show={showUpdateModal}
            onClose={this.handleCloseUpdateCellModal}
            cell={selectedCell}
            fields={cellFields}
            onSubmitChanges={this.handleSubmitCellChanges}
            onCellChange={this.handleCellUpdate}
          />
        )}
      </Fragment>
    );
  }
}

export default FestivalPage;

const Wrapper = styled.div`
  margin: 15px;

  td,
  th {
    text-align: center;
    border: 1px solid black;
    padding: 6px;
  }
`;

const Table = styled.table`
  margin: 30px auto;
  border-spacing: 5px;
  border-collapse: unset;
  background-color: ${props => props.theme.colors.ghostWhite};
`;

const HoverCell = styled.td`
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.roseDust};
    color: ${props => props.theme.colors.white};
  }

  ${props =>
    props.selected &&
    `
      background-color: ${props => props.theme.colors.roseDust};
      color: ${props => props.theme.colors.white}; 
  
      &:hover {
        background-color: ${props => props.theme.colors.tuscanRed};
      }
    `};
`;

const HoverHeadCell = styled.th`
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.roseDust};
    color: ${props => props.theme.colors.white};
  }

  ${props =>
    props.selected &&
    `
      background-color: ${props => props.theme.colors.roseDust};
      color: ${props => props.theme.colors.white}; 
  
      &:hover {
        background-color: ${props => props.theme.colors.tuscanRed};
      }
    `};
`;

const ButtonCell = styled.th`
  padding: 0 !important;

  > button {
    margin: 0;
    padding: 5px 40px;
  }
`;

const SecondHeadRow = styled.tr`
  font-weight: bold;
`;
