import _forEach from 'lodash/forEach';
import _includes from 'lodash/includes';

//@TODO validate dates! Send ISO date to the BE?
const validateRequiredFields = (invalidFields, fields, requiredFields) => {
  _forEach(fields, field => {
    // if field is in requiredFields array
    if (_includes(requiredFields, field.name)) {
      // and its value is empty
      if (field.value === '' || !field.value) {
        if (!_includes(invalidFields, field.name)) {
          // and is not already included in the invalid fields list, add it
          invalidFields.push(field.name);
        }
      } else {
        // otherwise field is valid so remove it from the invalid fields list
        const index = invalidFields.indexOf(field.name);
        if (index > -1) {
          invalidFields.splice(index, 1);
        }
      }
    }
  });

  return invalidFields;
};

export default validateRequiredFields;
