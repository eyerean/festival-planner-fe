import React from 'react';
import moment from 'moment';
import _map from 'lodash/map';
import { Glyphicon, OverlayTrigger, Tooltip, DropdownButton, MenuItem } from 'react-bootstrap';
import { getTimeslotLabelFromTimeslotStart } from 'app/lib/helpers';
import { Button, Grid } from 'shared';
import {
  Wrapper,
  Table,
  HoverCell,
  HoverHeadCell,
  ButtonCell,
  SecondHeadRow,
  StyledDropdown,
  DropdownDetailsWrapper,
} from './';

const FestivalPlannerComponent = ({
  festivalDetails,
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
  <Grid>
    {festivalDetails && (
      <div>
        <h2>
          {festivalDetails.name}
          <Button
            primary
            onClick={onSaveChanges}
            style={{ fontSize: 18, margin: 0, float: 'right' }}
          >
            Save Changes
          </Button>
        </h2>
        <DropdownDetailsWrapper>
          <span>Status:</span>
          <StyledDropdown>
            <DropdownButton title={selectedStatus} id="status-dd" onSelect={onChangeStatus}>
              <MenuItem eventKey="drafts" active={festivalDetails.status === 'drafts'}>
                drafts
              </MenuItem>
              <MenuItem eventKey="planned" active={festivalDetails.status === 'planned'}>
                planned
              </MenuItem>
              <MenuItem eventKey="ongoing" active={festivalDetails.status === 'ongoing'}>
                ongoing
              </MenuItem>
              <MenuItem eventKey="past" active={festivalDetails.status === 'past'}>
                past
              </MenuItem>
            </DropdownButton>
          </StyledDropdown>
        </DropdownDetailsWrapper>
        <p>
          Starts:{' '}
          {`${moment(festivalDetails.startDate, 'DD-MM-YYYY').format('ddd DD MMMM YYYY')}, ${moment(
            festivalDetails.startTime,
            'HH:mm'
          ).format('HH:mm')}`}
        </p>
        <p>
          Ends:{' '}
          {`${moment(festivalDetails.endDate, 'DD-MM-YYYY').format('ddd DD MMMM YYYY')}, ${moment(
            festivalDetails.endTime,
            'HH:mm'
          ).format('HH:mm')}`}
        </p>
        {festivalDetails.description && <p>Description: {festivalDetails.description}</p>}
      </div>
    )}
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
  </Grid>
);

export default FestivalPlannerComponent;
