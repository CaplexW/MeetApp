import React from 'react';
import PropTypes from 'prop-types';

export default function TitleBadge({ title, color }) {
  return <h2 className="d-flex justify-content-center my-4"><span className={`badge ${color}`}>{title}</span></h2>;
}
TitleBadge.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};
TitleBadge.defaultProps = {
  color: 'bg-info',
};
