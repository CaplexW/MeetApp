import React from 'react';
import PropTypes from 'prop-types';

export default function SearchStatus({ number }) {
  function getBadge() {
    const badge = { text: '', color: '' };
    if (number === 0) {
      badge.text = 'Никто не сможет с вами встретиться';
      badge.color = 'bg-danger';
    } else {
      if (number === 1 || number > 4) {
        badge.text = `${number} человек могут встретиться с вами`;
      }
      if (number !== 1 && number < 5) {
        badge.text = `${number} человека могут встретиться с вами`;
      }
      badge.color = 'bg-primary';
    }
    return badge;
  }
  return <h2><span className={`badge ${getBadge().color} m-3`}>{getBadge().text}</span></h2>;
}
SearchStatus.propTypes = {
  number: PropTypes.number.isRequired,
};
