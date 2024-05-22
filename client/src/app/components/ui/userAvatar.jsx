import React from 'react';
import PropTypes from 'prop-types';

export default function UserAvatar({ source, size }) {
  return (
    <img
      src={source}
      className="rounded-circle"
      alt="avatar"
      width={size}
      height={size}
    />
  );
}

UserAvatar.propTypes = {
  source: PropTypes.string.isRequired,
  size: PropTypes.number,
};
UserAvatar.defaultProps = {
  size: 40,
};
