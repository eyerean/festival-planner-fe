import React from 'react';
import { ControlLabel, HelpBlock, FormGroup } from 'react-bootstrap';
import Select from 'react-select';

const handleChange = (field, callback) => e => {
  callback({
    ...field,
    value: e.value,
  });
};

const SelectField = ({
  field,
  onChange,
  disabled,
  required,
  invalid,
  creatable = false,
}: Props) => (
  <FormGroup controlId={field.name} validationState={required && invalid ? 'error' : null}>
    <ControlLabel>
      {field.label || field.name}
      {required && ' *'}
    </ControlLabel>
    <Select
      creatable={creatable}
      menuContainerStyle={{ zIndex: 5 }}
      clearable={false}
      value={field.value || ''}
      options={field.values}
      onChange={handleChange(field, onChange)}
      disabled={disabled}
      invalid={invalid}
    />
    {required && invalid && <HelpBlock>Field is required.</HelpBlock>}
  </FormGroup>
);
export default SelectField;
