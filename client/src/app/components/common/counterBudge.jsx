import React from 'react';
import PropTypes from 'prop-types';

export default function CounterBudge({ current, max }) {
  const color = getColor();

  function getColor() {
    const diff = current / max;
    switch (diff) {
      case (diff >= 0.5 && diff < 0.8):
        return 'warnign';
      case (diff >= 0.8):
        return 'danger';
      default:
        return 'success';
    }
  }

  if (current) {
    return (
      <h6 className="d-flex justify-content-end mt-5">
        <span className={`badge bg-${color} mt-5`}>
          {`${current}/${max}`}
        </span>
      </h6>
    );
  }
}

CounterBudge.propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number,
};
CounterBudge.defaultProps = {
  max: 100,
};
