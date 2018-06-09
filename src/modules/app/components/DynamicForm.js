// @flow
import React from 'react';
import _map from 'lodash/map';
import _includes from 'lodash/includes';
import { FIELD_TYPES } from 'app/config/constants';
import { InputField, SelectField, DatetimeField } from './';

type Props = {
  fields: any,
  requiredFields: any,
  invalidFields: any,
  handleChange: any,
};

const DynamicForm = ({ fields, requiredFields, invalidFields, handleChange }: Props) =>
  _map(fields, (field, key) => {
    switch (field.type) {
      case FIELD_TYPES.SELECT:
        return (
          <SelectField
            key={key}
            field={field}
            onChange={handleChange(key)}
            required={_includes(requiredFields, field.name)}
            invalid={_includes(invalidFields, field.name)}
            creatable={field.creatable}
          />
        );
      case FIELD_TYPES.NUMBER:
        return (
          <InputField
            key={key}
            isNumber
            field={field}
            onChange={handleChange(key)}
            required={_includes(requiredFields, field.name)}
            invalid={_includes(invalidFields, field.name)}
          />
        );
      case FIELD_TYPES.DATE:
        return (
          <DatetimeField
            key={key}
            field={field}
            onChange={handleChange(key)}
            required={_includes(requiredFields, field.name)}
            invalid={_includes(invalidFields, field.name)}
          />
        );
      default:
        return (
          <InputField
            key={key}
            isTextarea={field.type === FIELD_TYPES.TEXTAREA}
            isPassword={field.type === FIELD_TYPES.PASSWORD}
            field={field}
            onChange={handleChange(key)}
            required={_includes(requiredFields, field.name)}
            invalid={_includes(invalidFields, field.name)}
          />
        );
    }
  });

export default DynamicForm;
