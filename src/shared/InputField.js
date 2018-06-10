import React from 'react';
import { ControlLabel, FormControl, HelpBlock, FormGroup } from 'react-bootstrap';

const handleChange = (field, callback) => e => {
  callback({
    ...field,
    value: e.target.value,
  });
};

const InputField = ({
  field,
  onChange,
  disabled,
  required,
  invalid,
  isTextarea,
  isNumber,
  isPassword,
}: Props) => (
  <FormGroup validationState={required && invalid ? 'error' : null}>
    <ControlLabel>
      {field.label || field.name}
      {required && ' *'}
    </ControlLabel>
    <FormControl
      style={isTextarea ? { resize: 'vertical', minHeight: 200 } : {}}
      type={isNumber ? 'number' : isPassword ? 'password' : 'text'}
      componentClass={isTextarea ? 'textarea' : 'input'}
      value={field.value || ''}
      min="0"
      onChange={handleChange(field, onChange)}
      disabled={disabled}
    />
    {required && invalid && <HelpBlock>Field is required.</HelpBlock>}
  </FormGroup>
);

export default InputField;
