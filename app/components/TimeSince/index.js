import React from 'react';
import PropTypes from 'prop-types';

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;

function getElement(number, string) {
  const rounded = Math.floor(number);
  return (
    <span>
      {rounded} {string}
      {rounded === 1 ? '' : 's'} ago
    </span>
  );
}

function TimeSince({ date }) {
  const elapsed = Date.now() - new Date(date);
  const seconds = Math.floor(elapsed / 1000);
  if (seconds < SECONDS_IN_MINUTE) {
    return getElement(seconds, 'second');
  }
  if (seconds < SECONDS_IN_HOUR) {
    const minutes = seconds / SECONDS_IN_MINUTE;
    return getElement(minutes, 'minute');
  }
  if (seconds < SECONDS_IN_DAY) {
    const hours = seconds / SECONDS_IN_HOUR;
    return getElement(hours, 'hour');
  }
  const days = seconds / SECONDS_IN_DAY;
  return getElement(days, 'day');
}

TimeSince.propTypes = {
  date: PropTypes.string,
};

export default TimeSince;
