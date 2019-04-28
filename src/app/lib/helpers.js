import moment from 'moment';
import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';

const getTimeslotLabelFromTimeslotStart = (tsStart, timeslot) =>
  `${moment(tsStart, 'HH:mm').format('HH:mm')} 
      - ${moment(tsStart, 'HH:mm')
        .add(timeslot.amount, timeslot.unit)
        .format('HH:mm')}`;

const handleDynamicFieldChange = (
  changedField: Field,
  fieldsState: Array<Field>,
  fieldIndex: number
) => {
  const newFields = _cloneDeep(fieldsState);
  const found = _find(newFields, { name: changedField.name });
  if (found) {
    newFields[fieldIndex] = { ...changedField, customInvalidMsg: '' };
  }

  return newFields;
};

export { getTimeslotLabelFromTimeslotStart, handleDynamicFieldChange };
