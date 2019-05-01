import _map from 'lodash/map';
import _has from 'lodash/has';

const mapObjectToFields = (initialFields, object) =>
  _map(initialFields, initF => ({
    ...initF,
    value: _has(object, initF.name) ? object[initF.name] : object.label,
  }));

export { mapObjectToFields };
