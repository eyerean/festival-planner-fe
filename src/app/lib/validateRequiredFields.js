import moment from 'moment';
import _forEach from 'lodash/forEach';
import _includes from 'lodash/includes';
import { FIELD_TYPES } from 'app/config/constants';

const validateRequiredFields = (invalidFields, fields, requiredFields) => {
  _forEach(fields, field => {
    // if field is in requiredFields array
    if (_includes(requiredFields, field.name)) {
      // if value is empty
      if (field.value === '' || !field.value) {
        if (!_includes(invalidFields, field.name)) {
          // and is not already included in the invalid fields list, add it
          invalidFields.push(field.name);
        }
      } else {
        if (field.type === FIELD_TYPES.DATE) {
          if (moment(field.value, ['DD-MM-YYYY']).isValid()) {
            const index = invalidFields.indexOf(field.name);
            if (index > -1) {
              invalidFields.splice(index, 1);
            }
          } else {
            // if date is not valid
            if (!_includes(invalidFields, field.name)) {
              // and is not already included in the invalid fields list, add it
              invalidFields.push(field.name);
            }
          }
        } else {
          // otherwise field is valid so remove it from the invalid fields list
          const index = invalidFields.indexOf(field.name);
          if (index > -1) {
            invalidFields.splice(index, 1);
          }
        }
      }
    }
  });

  return invalidFields;
};

export default validateRequiredFields;
