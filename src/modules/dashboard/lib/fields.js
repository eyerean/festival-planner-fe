const festivalFields = [
  {
    label: 'Festival Name',
    name: 'festivalName',
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
    label: 'End Date',
    name: 'endDate',
    value: '',
    type: 'date',
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
