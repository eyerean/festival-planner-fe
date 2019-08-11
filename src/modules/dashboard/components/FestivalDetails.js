import React from 'react';
import moment from 'moment';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Grid, Button } from 'shared';
import { StyledDropdown, DropdownDetailsWrapper } from './';

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
  </Grid>
);

export default FestivalDetails;
