const festivalFields = [
  {
    label: 'Festival Name',
    name: 'name',
    value: '',
    type: 'text',
  },
  {
    label: 'Start Date',
    name: 'startDate',
    value: '',
    type: 'date',
  },
  {
    label: 'Start Time First Artist',
    name: 'startTime',
    value: 'HH:mm',
    type: 'text',
  },
  {
    label: 'End Date',
    name: 'endDate',
    value: '',
    type: 'date',
  },
  {
    label: 'End Time Last Artist',
    name: 'endTime',
    value: 'HH:mm',
    type: 'text',
  },
  {
    label: 'Description',
    name: 'description',
    value: '',
    type: 'textarea',
  },
];

const updateCellFields = {
  artist: [
    {
      label: 'Artist name',
      name: 'artistName',
      value: '',
      type: 'text',
    },
  ],
  stage: [
    {
      label: 'Stage name',
      name: 'stageName',
      value: '',
      type: 'text',
    },
    {
      label: 'Stage order',
      name: 'stageOrder',
      value: '',
      type: 'number',
    },
    // future feature
    // {
    //   label: 'Update stage name for all days?',
    //   name: 'updateAll',
    //   value: true,
    //   type: 'boolean',
    // },
  ],
  day: [
    {
      label: 'Day',
      name: 'dayName',
      value: '',
      type: 'text',
    },
    {
      label: 'Day order',
      name: 'dayOrder',
      value: '',
      type: 'number',
    },
  ],
};

export { festivalFields, updateCellFields };
