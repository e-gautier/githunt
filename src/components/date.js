import React from 'react';
import '../assets/scss/date.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default (props) => {
  return (
    <div className="date">
      {dayjs(props.since).fromNow()} - {dayjs(props.since).format('MMM DD, YYYY')} –{' '}
      {dayjs(props.to).format('MMM DD, YYYY')}
    </div>
  );
};
