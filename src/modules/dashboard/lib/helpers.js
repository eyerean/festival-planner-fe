import _map from 'lodash/map';
import _has from 'lodash/has';
import _sortBy from 'lodash/sortBy';

const mapObjectToFields = (initialFields, object) =>
  _map(initialFields, initF => ({
    ...initF,
    value: _has(object, initF.name) ? object[initF.name] : object.label,
  }));

const mapStagesToOrderedList = stages => _map(_sortBy(stages, 'stageOrder'), stg => stg.label);
const orderArtistsByStageOrder = artistsCols => _sortBy(artistsCols, ['dayOrder', 'stageOrder']);
const sortDaysByDayOrder = days => _sortBy(days, ['dayOrder']);
const sortStagesByStageOrder = stages => _sortBy(stages, ['stageOrder']);

export {
  mapObjectToFields,
  mapStagesToOrderedList,
  orderArtistsByStageOrder,
  sortDaysByDayOrder,
  sortStagesByStageOrder,
};
