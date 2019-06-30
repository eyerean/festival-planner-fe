import React, { Fragment } from 'react';
import moment from 'moment';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _flatten from 'lodash/flatten';
import _includes from 'lodash/includes';
import _without from 'lodash/without';
import _sortBy from 'lodash/sortBy';
import { Button } from 'shared';
import { getTimeslotLabelFromTimeslotStart, handleDynamicFieldChange } from 'app/lib/helpers';
import { updateCellFields } from '../lib/fields';
import { mapObjectToFields } from '../lib/helpers';
import {
  UpdateCellModal,
  Wrapper,
  Table,
  HoverCell,
  HoverHeadCell,
  ButtonCell,
  SecondHeadRow,
} from '../components';

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
        stage: 'main stage',
        dayOrder: 1,
        day: 'saturday',
      },
      {
        label: '-',
        amountOfTimeslots: 1,
        stageOrder: 2,
        stage: 'stage abc',
        dayOrder: 1,
        day: 'saturday',
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
        stage: 'main stage',
        dayOrder: 1,
        day: 'saturday',
      },
      {
        label: 'famous band',
        amountOfTimeslots: 1,
        stageOrder: 2,
        stage: 'stage abc',
        dayOrder: 1,
        day: 'saturday',
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
        stage: 'stage abc',
        dayOrder: 1,
        day: 'saturday',
      },
    ],
  },
];

const mapStagesToOrderedList = stages => _map(_sortBy(stages, 'stageOrder'), stg => stg.label);
const orderArtistsByStageOrder = artistsCols => _sortBy(artistsCols, ['dayOrder', 'stageOrder']);
const sortDaysByDayOrder = days => _sortBy(days, ['dayOrder']);

class FestivalPage extends React.Component {
  // TODO in a construcotr
  state = {
    timeslot: { amount: 1, unit: 'h' }, // one hour by default
    headData: headInitialData, //@TODO already here sort by stageOrder
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
              stageOrder: day.stagesCols.length + 1,
            },
          ],
        })),
      ],
      // add empty cells for artists
      bodyData: _map(prevState.bodyData, row => ({
        ...row,
        artistsCols: orderArtistsByStageOrder([
          ...row.artistsCols,
          ..._map(prevState.headData, day => ({
            label: '',
            amountOfTimeslots: 1,
            stageOrder: day.stagesCols.length + 1,
            dayOrder: day.dayOrder,
          })),
        ]),
      })),
    }));
  };

  handleAddDay = () => {
    const { headData } = this.state;
    const newDay = {
      label: `day ${headData.length + 1}`,
      dayOrder: headData.length + 1,
      // default the existing stages (if any)
      stagesCols: headData[0].stagesCols || [{ label: 'stage 1', stageOrder: 1 }],
    };

    this.setState(prevState => ({
      headData: [...prevState.headData, newDay],
      // add empty cells for artists
      bodyData: _map(prevState.bodyData, row => ({
        ...row,
        artistsCols: orderArtistsByStageOrder([
          ...row.artistsCols,
          ..._map(newDay.stagesCols, stage => ({
            label: '',
            amountOfTimeslots: 1,
            stageOrder: stage.stageOrder,
            dayOrder: newDay.dayOrder,
            day: newDay.label,
            stage: stage.label,
          })),
        ]),
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

  handleStageUpdate = (stage, dayOrder) => () => {
    this.setState({
      selectedCell: { ...stage, cellType: 'stage', dayOrder },
      showUpdateModal: true,
      cellFields: mapObjectToFields(updateCellFields.stage, { ...stage, updateAll: true }),
    });
  };

  handleCloseUpdateCellModal = () => {
    this.setState({
      selectedCell: undefined,
      showUpdateModal: false,
    });
  };

  handleSubmitCellChanges = () => {
    // @TODO: clean this up
    const { selectedCell } = this.state;

    switch (selectedCell.cellType) {
      case 'artist': //@TODO constants?
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
                              label: _find(prevState.cellFields, { name: 'artistName' }).value,
                            }
                          : ar
                    ),
                  }
                : row
          ),
        }));
        break;
      case 'day':
        this.setState(prevState => {
          const newName = _find(prevState.cellFields, { name: 'dayName' }).value;
          const newOrder = parseInt(_find(prevState.cellFields, { name: 'dayOrder' }).value, 10);
          const prevOrderedDays = _map(sortDaysByDayOrder(prevState.headData), 'label');

          let newOrderedDays = _without(prevOrderedDays, newName, selectedCell.label); // without newName and selectedCell.label
          newOrderedDays.splice(newOrder - 1, 0, newName);

          return {
            selectedCell: undefined,
            showUpdateModal: false,
            headData: sortDaysByDayOrder(
              _map(
                prevState.headData,
                day =>
                  day.dayOrder === prevState.selectedCell.dayOrder && // this condition is wrong
                  day.label === prevState.selectedCell.label //hmmmm isos includes?
                    ? {
                        ...day,
                        dayOrder: newOrderedDays.indexOf(newName) + 1,
                        label: newName,
                      }
                    : {
                        ...day,
                        dayOrder: newOrderedDays.indexOf(day.label) + 1,
                      }
              )
            ),
            bodyData: _map(prevState.bodyData, ts => ({
              ...ts,
              artistsCols: orderArtistsByStageOrder(
                _map(
                  ts.artistsCols,
                  artist =>
                    artist.day === prevState.selectedCell.label
                      ? {
                          ...artist,
                          day: newName,
                          dayOrder: newOrderedDays.indexOf(artist.day) + 1,
                        }
                      : {
                          ...artist,
                          dayOrder: newOrderedDays.indexOf(artist.day) + 1,
                        }
                )
              ),
            })),
          };
        });
        break;
      case 'stage':
        this.setState(
          prevState => {
            const newName = _find(prevState.cellFields, { name: 'stageName' }).value;
            const newOrder = parseInt(
              _find(prevState.cellFields, { name: 'stageOrder' }).value,
              10
            );
            const shouldUpdateAll = _find(prevState.cellFields, { name: 'updateAll' }).value;
            const prevOrderedStagesPerDay = mapStagesToOrderedList(
              prevState.headData[0].stagesCols
            );
            // this is wrong if name has changed
            let newOrderedStagesPerDay = _without(prevOrderedStagesPerDay, newName);
            newOrderedStagesPerDay.splice(newOrder - 1, 0, newName);

            return {
              selectedCell: undefined,
              showUpdateModal: false,
              headData: _map(prevState.headData, day => ({
                ...day,
                stagesCols: _map(
                  day.stagesCols,
                  stage =>
                    stage.label === prevState.selectedCell.label &&
                    (shouldUpdateAll ||
                      (!shouldUpdateAll && day.dayOrder === prevState.selectedCell.dayOrder))
                      ? {
                          ...stage,
                          label: newName,
                          stageOrder: newOrderedStagesPerDay.indexOf(newName) + 1,
                        }
                      : {
                          ...stage,
                          // always update order because otherwise it's getting way too messy
                          stageOrder: newOrderedStagesPerDay.indexOf(stage.label) + 1,
                        }
                ),
              })),
              bodyData: _map(prevState.bodyData, ts => ({
                ...ts,
                artistsCols: orderArtistsByStageOrder(
                  _map(
                    ts.artistsCols,
                    artist =>
                      artist.stage === prevState.selectedCell.label
                        ? {
                            ...artist,
                            stage: newName,
                            stageOrder: newOrderedStagesPerDay.indexOf(artist.stage) + 1,
                          }
                        : {
                            ...artist,
                            stageOrder: newOrderedStagesPerDay.indexOf(artist.stage) + 1,
                          }
                  )
                ),
              })),
            };
          },
          () => {
            // update order of stages according to newly changed stages order
            this.setState(prevState => ({
              headData: _map(prevState.headData, day => ({
                ...day,
                stagesCols: _sortBy(day.stagesCols, 'stageOrder'),
              })),
              bodyData: _map(prevState.bodyData, ts => ({
                ...ts,
                artistsCols: orderArtistsByStageOrder(ts.artistsCols),
              })),
            }));
          }
        );
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
                    <HoverCell
                      key={stage.stageOrder}
                      onClick={this.handleStageUpdate(stage, day.dayOrder)}
                    >
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
