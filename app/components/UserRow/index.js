import React from 'react';
import PropTypes from 'prop-types';

export function UserRow({ username, name, uuid }) {
  return (
    <div key={uuid}>
      User: <a href={`/user/${username}`}>{name || 'no name provided'}</a>
    </div>
  );
}

UserRow.propTypes = {
  username: PropTypes.string,
  uuid: PropTypes.string,
  name: PropTypes.string,
};
