import React from 'react';
import PropTypes from 'prop-types';
import QualitiesList from './qualities/qualitiesList';

export default function QualitiesCard({ qualitiesIds }) {
  return (
    <div className="card mb-3">
      <div className="
        card-body
        d-flex
        flex-column
        justify-content-center
        text-center
        "
      >
        <h5 className="card-title">Качества</h5>
        <p className="cart-text">
          <QualitiesList qualitiesIds={qualitiesIds} />
        </p>
      </div>
    </div>
  );
}

QualitiesCard.propTypes = {
  qualitiesIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
