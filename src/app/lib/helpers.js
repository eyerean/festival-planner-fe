import moment from 'moment';

const getTimeslotLabelFromTimeslotStart = (tsStart, timeslot) =>
  `${moment(tsStart, 'HH:mm').format('HH:mm')} 
      - ${moment(tsStart, 'HH:mm')
        .add(timeslot.amount, timeslot.unit)
        .format('HH:mm')}`;

export { getTimeslotLabelFromTimeslotStart };
