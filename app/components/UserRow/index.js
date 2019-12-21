import React from 'react';
import PropTypes from 'prop-types';

export function UserRow({ user: { username, name, uuid } }) {
  return (
    <div key={uuid}>
      User: <a href={`/user/${username}`}>{name || 'no name provided'}</a>
    </div>
  );
}

UserRow.propTypes = {
  user: PropTypes.object,
};
