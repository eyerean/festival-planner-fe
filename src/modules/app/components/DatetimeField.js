// @flow
import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import type Moment from 'moment';
import { ControlLabel, HelpBlock, FormGroup } from 'react-bootstrap';

type Field = {
  label: string,
  name: string,
  value: string,
};

type Props = {
  field: Field,
  onChange: Field => void,
  disabled: boolean,
  required: boolean,
  invalid: boolean,
  dateFormat: string,
  timeFormat: boolean,
};

const handleChange = (field: Field, callback: Field => void) => (momentDate: Moment) => {
  callback({
    ...field,
    value: moment(momentDate).format('DD-MM-YYYY'),
  });
};

const DatetimeField = ({
  field,
  onChange,
  disabled,
  required,
  invalid,
  dateFormat = 'DD-MM-YYYY',
  timeFormat = false,
}: Props) => (
  <FormGroup validationState={required && invalid ? 'error' : null}>
    <ControlLabel>
      {field.label || field.name}
      {required && ' *'}
    </ControlLabel>
    <Datetime
      value={field.value || 'DD-MM-YYYY'}
      closeOnSelect
      dateFormat={dateFormat}
      timeFormat={timeFormat}
      onChange={handleChange(field, onChange)}
    />
    {required && invalid && <HelpBlock>Field is required.</HelpBlock>}
  </FormGroup>
);

export default DatetimeField;
