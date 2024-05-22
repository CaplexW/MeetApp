import React from 'react';
import PropTypes from 'prop-types';
import showElement from '../../utils/debug/showElement';

export default function Loader({ min, max, reason }) {
  const isProd = (process.env.NODE_ENV === 'production');
  if (reason && !isProd) showElement(reason, 'reason of loader');

  if (max) return <h1><span className="badge bg-warning m-3 w-100">Загрузка...</span></h1>;
  if (min) return <h4><span className="badge bg-warning m-3">Загрузка...</span></h4>;
  return <h2><span className="badge bg-warning m-3">Загрузка...</span></h2>;
}
Loader.propTypes = {
  min: PropTypes.bool,
  max: PropTypes.bool,
  reason: PropTypes.string,
};
Loader.defaultProps = {
  min: false,
  max: false,
  reason: null,
};
