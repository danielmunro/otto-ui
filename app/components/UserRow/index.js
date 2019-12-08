import React from 'react';
import PropTypes from 'prop-types';

export function UserRow({ username, uuid }) {
  return (
    <div key={uuid}>
      User: <a href={`/user/${username}`}>{username}</a>
    </div>
  );
}

UserRow.propTypes = {
  username: PropTypes.string,
  uuid: PropTypes.string,
};
