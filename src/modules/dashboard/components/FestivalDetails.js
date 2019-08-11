import React from 'react';
import moment from 'moment';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Grid, Button } from 'shared';
import { StyledDropdown, DropdownDetailsWrapper } from './';

const dateDisplay = (date, time) => {
  const isTimeValid = moment(time, 'HH:mm').isValid();
  return `${moment(date, 'DD-MM-YYYY').format('ddd DD MMMM YYYY')}${
    isTimeValid ? `, ${moment(time, 'HH:mm').format('HH:mm')}` : ''
  }`;
};

const FestivalDetails = ({ festivalDetails, onSaveChanges, selectedStatus, onChangeStatus }) => (
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
        <p>Starts: {dateDisplay(festivalDetails.startDate, festivalDetails.startTime)}</p>
        <p>Ends: {dateDisplay(festivalDetails.endDate, festivalDetails.endTime)}</p>
        {festivalDetails.description && <p>Description: {festivalDetails.description}</p>}
      </div>
    )}
  </Grid>
);

export default FestivalDetails;
