// @flow
import React from 'react';
import { ControlLabel, FormControl, HelpBlock, FormGroup } from 'react-bootstrap';

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
  textarea: boolean,
  number: boolean,
};

const handleChange = (field: Field, callback: Field => void) => (e: Event) => {
  callback({
    ...field,
    value: e.target.value,
  });
};

const InputField = ({ field, onChange, disabled, required, invalid, textarea, number }: Props) => (
  <FormGroup validationState={required && invalid ? 'error' : null}>
    <ControlLabel>
      {field.label || field.name}
      {required && ' *'}
    </ControlLabel>
    <FormControl
      style={textarea ? { resize: 'vertical', minHeight: 200 } : {}}
      type={number ? 'number' : 'text'}
      componentClass={textarea ? 'textarea' : 'input'}
      value={field.value || ''}
      min="0"
      onChange={handleChange(field, onChange)}
      disabled={disabled}
    />
    {required && invalid && <HelpBlock>Field is required.</HelpBlock>}
  </FormGroup>
);

export default InputField;
