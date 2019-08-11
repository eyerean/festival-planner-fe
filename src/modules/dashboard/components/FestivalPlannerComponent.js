import React from 'react';
import _map from 'lodash/map';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getTimeslotLabelFromTimeslotStart } from 'app/lib/helpers';
import { Button } from 'shared';
import { Wrapper, Table, HoverCell, HoverHeadCell, ButtonCell, SecondHeadRow } from './';

const FestivalPlannerComponent = ({
  headData,
  bodyData,
  timeslot,
  selectedCell,
  showUpdateModal,
  cellFields,
  selectedStatus,
  onSaveChanges,
  onChangeStatus,
  onDayUpdate,
  onAddStage,
  onStageUpdate,
  onArtistUpdate,
}) => (
  <Wrapper>
    <Table>
      <thead>
        <tr>
          <th>hours</th>
          {_map(headData, day => (
            <HoverHeadCell
              key={day._id}
              colSpan={day.stagesCols.length || '1'}
              onClick={onDayUpdate(day)}
            >
              {day.label}
            </HoverHeadCell>
          ))}
          {/* 
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
              */}
        </tr>
        <SecondHeadRow>
          <OverlayTrigger
            overlay={<Tooltip id="add-stage-tooltip">Add new stage per day</Tooltip>}
            placement="left"
          >
            <ButtonCell>
              <Button primary onClick={onAddStage}>
                <Glyphicon glyph="plus" />
              </Button>
            </ButtonCell>
          </OverlayTrigger>
          {_map(headData, day =>
            _map(day.stagesCols, stage => (
              <HoverCell key={stage._id} onClick={onStageUpdate(stage, day.dayOrder)}>
                {stage.label}
              </HoverCell>
            ))
          )}
        </SecondHeadRow>
      </thead>
      <tbody>
        {_map(bodyData, row => (
          <tr key={row._id}>
            <td>{getTimeslotLabelFromTimeslotStart(row.timeslotStart, timeslot)}</td>
            {_map(row.artistsCols, artist => (
              <HoverCell
                key={artist._id}
                selected={
                  selectedCell &&
                  selectedCell.dayOrder === artist.dayOrder &&
                  selectedCell.stageOrder === artist.stageOrder &&
                  selectedCell.label === artist.label
                }
                rowSpan={artist.amountOfTimeslots || '1'}
                onClick={onArtistUpdate(artist, row.timeslotOrder)}
              >
                {artist.label}
              </HoverCell>
            ))}
          </tr>
        ))}
        {/*
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
              */}
      </tbody>
    </Table>
  </Wrapper>
);

export default FestivalPlannerComponent;
