import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _reject from 'lodash/reject';
import { Button } from 'shared';

class FestivalPage extends React.Component {
  state = {
    headData: [
      {
        label: 'saturday',
        dayOrder: 0,
        stagesCols: [
          {
            label: 'awesomesauce',
            stageOrder: 0,
          },
          {
            label: 'stage abc',
            stageOrder: 1,
          },
        ],
      },
    ],
    bodyData: [
      {
        timeslotOrder: 0,
        timeslotLabel: '15:00 - 16:00',
        artistsCols: [
          {
            label: 'band A',
            amountOfTimeslots: 1,
            stageOrder: 0,
          },
          {
            label: '-',
            amountOfTimeslots: 1,
            stageOrder: 1,
          },
        ],
      },
      {
        timeslotOrder: 1,
        timeslotLabel: '16:00 - 17:00',
        artistsCols: [
          {
            label: 'band ZZ',
            amountOfTimeslots: 2,
            stageOrder: 0,
          },
          {
            label: 'famous band',
            amountOfTimeslots: 1,
            stageOrder: 1,
          },
        ],
      },
      {
        timeslotOrder: 2,
        timeslotLabel: '17:00 - 18:00',
        artistsCols: [
          {
            label: 'allochiria',
            amountOfTimeslots: 1,
            stageOrder: 1,
          },
        ],
      },
    ],
  };

  handleAddTimeslot = () => {
    this.setState(prevState => ({
      bodyData: [
        ...prevState.bodyData,
        {
          timeslotOrder: prevState.bodyData.length,
          timeslotLabel: '18:00 - 19:00', // asking in modal
          artistsCols: [
            {
              label: 'metallica', // asking in modal
              amountOfTimeslots: 2, // by default 1 !
              stageOrder: 0, // asking in modal
            },
            {
              label: 'deftones',
              amountOfTimeslots: 1,
              stageOrder: 1,
            },
          ],
        },
      ],
    }));
  };

  handleAddStage = () => {
    console.log('adding a stage');
    // include dropdown to choose day to add the stage
    // if only 1 day, show only that one in the dropdown
    const { headData } = this.state;
    const foundDay = _find(headData, { label: 'saturday' });

    if (foundDay) {
      // adding a stage to an existing day - only option so far
      const updatedDay = {
        ...foundDay,
        stagesCols: [
          ...foundDay.stagesCols,
          {
            label: 'new_stage', // ask in modal
            stageOrder: foundDay.stagesCols.length,
          },
        ],
      };

      this.setState(prevState => ({
        headData: [..._reject(prevState.headData, h => h.label === foundDay.label), updatedDay],
      }));
    }
  };

  handleAddDay = () => {
    this.setState(prevState => ({
      headData: [
        ...prevState.headData,
        {
          label: 'sunday', // ask in modal!
          dayOrder: 1, // ask in modal! by default prevState.headData.length + 1
          stagesCols: [
            // default the existing ones (if any)
            {
              label: 'awesomesauce',
              stageOrder: 0,
            },
            {
              label: 'stage abc',
              stageOrder: 1,
            },
          ],
        },
      ],
    }));
  };

  render() {
    const { headData, bodyData } = this.state;

    return (
      <Fragment>
        <Wrapper>
          <table>
            <thead>
              <tr>
                <th>hours</th>
                {_map(headData, day => (
                  <th key={day.dayOrder} colSpan={day.stagesCols.length || '1'}>
                    {day.label}
                  </th>
                ))}
                <ButtonCell>
                  <Button primary onClick={this.handleAddDay}>
                    <Glyphicon glyph="plus" />
                  </Button>
                </ButtonCell>
              </tr>
              <SecondHeadRow>
                <ButtonCell>
                  <Button primary onClick={this.handleAddStage}>
                    <Glyphicon glyph="plus" />
                  </Button>
                </ButtonCell>
                {_map(headData, day =>
                  _map(day.stagesCols, stage => <td key={stage.stageOrder}>{stage.label}</td>)
                )}
              </SecondHeadRow>
            </thead>
            <tbody>
              {_map(bodyData, row => (
                <tr key={row.timeslotOrder}>
                  <td>{row.timeslotLabel}</td>
                  {_map(row.artistsCols, artist => (
                    <td key={artist.stageOrder} rowSpan={artist.amountOfTimeslots || '1'}>
                      {artist.label}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <ButtonCell>
                  <Button primary onClick={this.handleAddTimeslot}>
                    <Glyphicon glyph="plus" />
                  </Button>
                </ButtonCell>
              </tr>
            </tbody>
          </table>
        </Wrapper>
        {/*
          <AddDayModal />
          <AddStageModal />
          <AddTimeslotModal />
        */}
      </Fragment>
    );
  }
}

export default FestivalPage;

const Wrapper = styled.div`
  margin: 15px;

  table {
    margin: 30px auto;
    border-spacing: 5px;
    border-collapse: unset;
  }

  td,
  th {
    text-align: center;
    border: 1px solid black;
    padding: 6px;
  }
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
