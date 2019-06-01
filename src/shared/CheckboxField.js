import React from 'react';
import { HelpBlock, FormGroup, ControlLabel, Checkbox } from 'react-bootstrap';
// import { CustomCheckbox } from './';

const handleChange = (field, callback) => () =>
  callback({
    ...field,
    value: !field.value,
  });

const CheckboxField = ({ field, onChange, required, invalid }) => (
  <FormGroup validationState={required && invalid ? 'error' : null}>
    <ControlLabel>
      {field.label || field.name}
      {required && ' *'}
    </ControlLabel>
    <Checkbox
      inline
      checked={field.value}
      onChange={handleChange(field, onChange)}
      style={{ margin: '-25px 0 0 15px' }}
    />
    {required && invalid && <HelpBlock>Φield is required.</HelpBlock>}
  </FormGroup>
);

export default CheckboxField;
