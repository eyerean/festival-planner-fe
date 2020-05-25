import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import reduxFetch, { selectors } from 'react-redux-fetch';
import moment from 'moment';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _flatten from 'lodash/flatten';
import _includes from 'lodash/includes';
import _without from 'lodash/without';
import _isEmpty from 'lodash/isEmpty';
import apiRoutes from 'app/api/routes';
import { handleDynamicFieldChange } from 'app/lib/helpers';
import { updateCellFields } from '../lib/fields';
import {
  mapObjectToFields,
  mapStagesToOrderedList,
  orderArtistsByStageOrder,
  sortDaysByDayOrder,
  sortStagesByStageOrder,
} from '../lib/helpers';
import { UpdateCellModal, FestivalPlannerComponent, FestivalDetails } from '../components';

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

class FestivalPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeslot: { amount: 1, unit: 'h' }, // one hour by default
      headData: [],
      bodyData: [],
      selectedCell: undefined,
      cellFields: [],
      invalidCellFields: [],
      selectedStatus: '',
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.dispatchFestivalDetailsGet(params.id);
  }

  componentDidUpdate(prevProps) {
    const { festivalDetails } = this.props;
    if (prevProps.festivalDetails !== festivalDetails && !_isEmpty(festivalDetails)) {
      this.setState({
        selectedStatus: festivalDetails.status,
        headData: sortDaysByDayOrder(
          festivalDetails.details ? festivalDetails.details.days : headInitialData
        ),
        bodyData: festivalDetails.details ? festivalDetails.details.timeslots : bodyInitialData,
      });
    }
  }

  handleChangeStatus = newStatus => {
    this.setState({
      selectedStatus: newStatus,
    });
  };

  handleAddTimeslot = () => {
    const { bodyData, timeslot } = this.state;
    const lastTs = _find(bodyData, { timeslotOrder: bodyData.length - 1 });
    const newTsStart = moment(lastTs ? lastTs.timeslotStart : '11:00', 'HH:mm')
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
                stage: stage.label,
                stageOrder: stage.stageOrder,
                dayOrder: day.dayOrder,
                day: day.label,
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
            stage: `stage ${day.stagesCols.length + 1}`,
            dayOrder: day.dayOrder,
            day: day.label,
          })),
        ]),
      })),
    }));
  };

  // currently not used
  // handleAddDay = () => {
  //   const { headData } = this.state;
  //   const newDay = {
  //     label: `day ${headData.length + 1}`,
  //     dayOrder: headData.length + 1,
  //     // default the existing stages (if any)
  //     stagesCols: headData[0].stagesCols || [{ label: 'stage 1', stageOrder: 1 }],
  //   };

  //   this.setState(prevState => ({
  //     headData: [...prevState.headData, newDay],
  //     // add empty cells for artists
  //     bodyData: _map(prevState.bodyData, row => ({
  //       ...row,
  //       artistsCols: orderArtistsByStageOrder([
  //         ...row.artistsCols,
  //         ..._map(newDay.stagesCols, stage => ({
  //           label: '',
  //           amountOfTimeslots: 1,
  //           stageOrder: stage.stageOrder,
  //           dayOrder: newDay.dayOrder,
  //           day: newDay.label,
  //           stage: stage.label,
  //         })),
  //       ]),
  //     })),
  //   }));
  // };

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

  handleArtistSubmitChanges = () => {
    this.setState(prevState => ({
      selectedCell: undefined,
      showUpdateModal: false,
      bodyData: _map(prevState.bodyData, row =>
        row.timeslotOrder === prevState.selectedCell.tsOrder
          ? {
              ...row,
              artistsCols: orderArtistsByStageOrder(
                _map(row.artistsCols, ar =>
                  ar.dayOrder === prevState.selectedCell.dayOrder &&
                  ar.stageOrder === prevState.selectedCell.stageOrder
                    ? {
                        ...ar,
                        label: _find(prevState.cellFields, { name: 'artistName' }).value,
                      }
                    : ar
                )
              ),
            }
          : row
      ),
    }));
  };

  handleDaySubmitChanges = () => {
    this.setState(prevState => {
      const newName = _find(prevState.cellFields, { name: 'dayName' }).value;
      const newOrder = parseInt(_find(prevState.cellFields, { name: 'dayOrder' }).value, 10);
      const prevOrderedDays = _map(sortDaysByDayOrder(prevState.headData), 'label');
      // remove from list newName and selectedCell.label
      let newOrderedDays = _without(prevOrderedDays, newName, prevState.selectedCell.label);
      // and add newName to correct order
      newOrderedDays.splice(newOrder - 1, 0, newName);

      return {
        selectedCell: undefined,
        showUpdateModal: false,
        headData: sortDaysByDayOrder(
          _map(prevState.headData, day =>
            day.label === prevState.selectedCell.label
              ? {
                  ...day,
                  dayOrder: newOrderedDays.indexOf(newName) + 1, //newOrder?
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
            _map(ts.artistsCols, artist =>
              artist.day === prevState.selectedCell.label
                ? {
                    ...artist,
                    day: newName,
                    dayOrder: newOrderedDays.indexOf(newName) + 1, //newOrder?
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
  };

  handleStageSubmitChanges = () => {
    this.setState(
      prevState => {
        const newName = _find(prevState.cellFields, { name: 'stageName' }).value;
        const newOrder = parseInt(_find(prevState.cellFields, { name: 'stageOrder' }).value, 10);
        const prevOrderedStagesPerDay = mapStagesToOrderedList(prevState.headData[0].stagesCols);
        let newOrderedStagesPerDay = _without(
          prevOrderedStagesPerDay,
          newName,
          prevState.selectedCell.label
        );
        newOrderedStagesPerDay.splice(newOrder - 1, 0, newName);

        return {
          selectedCell: undefined,
          showUpdateModal: false,
          headData: _map(prevState.headData, day => ({
            ...day,
            stagesCols: sortStagesByStageOrder(
              _map(day.stagesCols, stage =>
                stage.label === prevState.selectedCell.label &&
                stage.stageOrder === prevState.selectedCell.stageOrder
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
              )
            ),
          })),
          bodyData: _map(prevState.bodyData, ts => ({
            ...ts,
            artistsCols: orderArtistsByStageOrder(
              _map(ts.artistsCols, artist =>
                artist.stage === prevState.selectedCell.label
                  ? {
                      ...artist,
                      stage: newName,
                      stageOrder: newOrderedStagesPerDay.indexOf(newName) + 1,
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
            stagesCols: sortStagesByStageOrder(day.stagesCols),
          })),
          bodyData: _map(prevState.bodyData, ts => ({
            ...ts,
            artistsCols: orderArtistsByStageOrder(ts.artistsCols),
          })),
        }));
      }
    );
  };

  handleSubmitCellChanges = () => {
    const { selectedCell } = this.state;
    switch (selectedCell.cellType) {
      case 'artist':
        this.handleArtistSubmitChanges();
        break;
      case 'day':
        this.handleDaySubmitChanges();
        break;
      case 'stage':
        this.handleStageSubmitChanges();
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

  handleSaveChanges = () => {
    const {
      match: { params },
      festivalDetails,
    } = this.props;
    const { selectedStatus, headData, bodyData } = this.state;

    const festivalUpdates = {
      details: {
        days: headData,
        timeslots: bodyData,
      },
    };

    if (selectedStatus !== festivalDetails.status) {
      festivalUpdates.status = selectedStatus;
    }

    this.props.dispatchUpdateFestivalPut(params.id, festivalUpdates);
  };

  render() {
    const {
      headData,
      bodyData,
      timeslot,
      selectedCell,
      showUpdateModal,
      cellFields,
      selectedStatus,
    } = this.state;
    const { festivalDetails } = this.props;

    return (
      <React.Fragment>
        <FestivalDetails
          festivalDetails={festivalDetails}
          onSaveChanges={this.handleSaveChanges}
          selectedStatus={selectedStatus}
          onChangeStatus={this.handleChangeStatus}
        />
        <FestivalPlannerComponent
          headData={headData}
          bodyData={bodyData}
          timeslot={timeslot}
          selectedCell={selectedCell}
          showUpdateModal={showUpdateModal}
          cellFields={cellFields}
          onDayUpdate={this.handleDayUpdate}
          onAddStage={this.handleAddStage}
          onStageUpdate={this.handleStageUpdate}
          onArtistUpdate={this.handleArtistUpdate}
          onAddTimeslot={this.handleAddTimeslot}
          hasValidTimeslot={festivalDetails && moment(festivalDetails.endTime, 'HH:mm').isValid()}
        />

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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  festivalDetails: selectors.getRepository('festivalDetails')(state),
});

const mapPropsToDispatchToProps = props => [
  {
    resource: 'festivalDetails',
    method: 'GET',
    request: id => ({
      url: apiRoutes().festival(id),
    }),
  },
  {
    resource: 'updateFestival',
    method: 'PUT',
    request: (id, festivalUpdates) => ({
      url: apiRoutes().festival(id),
      body: festivalUpdates,
    }),
  },
];

const enhance = compose(reduxFetch(mapPropsToDispatchToProps), connect(mapStateToProps));

export default enhance(FestivalPage);
